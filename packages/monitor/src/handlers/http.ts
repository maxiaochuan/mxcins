import { win } from '../common';
import { type HttpEvent, type EventHandler } from '../types';

const HttpHandler: EventHandler<'http'> = {
  name: 'http',
  init: monitor => {
    if (!('XMLHttpRequest' in win)) {
      return;
    }

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
        method: method.toUpperCase(),
        start: Date.now(),
      };
      prevopen.apply(this, [method, url, async, username, password]);
    }
    prototype.open = open as XMLHttpRequest['open'];

    function send(this: XMLHttpRequest, body?: Document | XMLHttpRequestBodyInit | null): void {
      this.__monitor.request = { data: body };
      this.addEventListener('loadend', function loadend() {
        const { response, status } = this;
        this.__monitor.response = {
          data: response,
          status,
        };
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
      const info: HttpEvent = {
        url: input as string,
        method: init?.method ?? 'GET',
        start: Date.now(),
        request: {
          data: init?.body,
        },
      };
      return await prevfetch.apply(this, [input, init]).then(resp => {
        const copy = resp.clone();
        void copy.text().then(v => {
          info.response = { status: copy.status, data: v };
          monitor.emit('http', info);
        });
        return resp;
      });
    }
    win.fetch = fetch;
  },
  handle: result => {
    return result;
  },
};

export default HttpHandler;
