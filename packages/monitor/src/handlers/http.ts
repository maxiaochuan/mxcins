import dayjs from 'dayjs';
import statuses from 'statuses';
import { win } from '../common';
import type { HttpEvent, EventHandler, HandleResponseStatusCode } from '../types';

declare global {
  interface XMLHttpRequest {
    __monitor: HttpEvent;
  }
}

let fn: HandleResponseStatusCode;

const HttpHandler: EventHandler<'http'> = {
  name: 'http',
  init: monitor => {
    if (!('XMLHttpRequest' in win)) {
      return;
    }

    fn = monitor.conf.handleResponseStatusCode;

    const prototype = XMLHttpRequest.prototype;
    const prevopen = prototype.open;
    const prevsend = prototype.send;

    function open(
      this: XMLHttpRequest,
      method: string,
      url: string | URL,
      async: boolean,
      username?: string | null,
      password?: string | null,
    ): void {
      this.__monitor = {
        url,
        type: 'xhr',
        method: method.toUpperCase(),
        start: Date.now(),
        status: 0,
      };
      prevopen.apply(this, [method, url, async, username, password]);
    }
    prototype.open = open as XMLHttpRequest['open'];

    function send(this: XMLHttpRequest, body?: Document | XMLHttpRequestBodyInit | null): void {
      this.__monitor.request = { data: body };
      this.addEventListener('loadend', function loadend() {
        const { response, status } = this;
        this.__monitor.status = status;
        this.__monitor.response = response;
        this.__monitor.end = Date.now();
        this.__monitor.elapsed = this.__monitor.end - this.__monitor.start;
        monitor.emit('http', this.__monitor);
      });
      prevsend.apply(this, [body]);
    }
    prototype.send = send;

    const prevfetch = win.fetch;
    async function fetch(
      this: Window,
      input: RequestInfo | URL,
      init?: RequestInit,
    ): Promise<Response> {
      const ev: HttpEvent = {
        url: input as string,
        method: init?.method ?? 'GET',
        start: Date.now(),
        status: 0,
        type: 'fetch',
        request: {
          data: init?.body,
        },
      };
      return await prevfetch.apply(this, [input, init]).then(
        resp => {
          const copy = resp.clone();
          void copy.text().then(v => {
            ev.response = v;
            ev.status = copy.status;
            ev.end = Date.now();
            ev.elapsed = ev.end - ev.start;
            monitor.emit('http', ev);
          });
          return resp;
        },
        err => {
          ev.end = Date.now();
          ev.elapsed = ev.end - ev.start;
          ev.status = 0;
          ev.response = { data: undefined };

          throw err;
        },
      );
    }
    win.fetch = fetch;
  },
  handle: ev => {
    const { method, start, type, request, response, elapsed = 0 } = ev;
    const status = fn?.(ev) ?? ev.status;
    const report = status === 0 || status >= 400;
    const url = ev.url.toString();
    const time = dayjs(start).toISOString();

    const message = (() => {
      if (status === 0) {
        return `${url}; 请求失败`;
      } else if (status < 400) {
        return `${url}; 请求成功`;
      } else {
        const info: string = statuses.message[status] ?? '';
        return `${url}; 请求失败; 信息:${status} ${info}`;
      }
    })();

    return {
      info: {
        url,
        time,
        elapsed,
        message,
        request: {
          type,
          method,
          data: request ?? '',
        },
        response: {
          status,
          data: response ?? '',
        },
      },
      report,
    };
  },
};

export default HttpHandler;
