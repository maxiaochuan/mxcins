import { win } from '../common';
import { EVENT_TYPE, Handler } from '../types';

export interface HttpInput {
  url: string | URL;
  method: string;
  start: number;
  end?: number;
  elapsed?: number;
  request?: { data: any };
  response?: { status: number; data: any };
}

export type HttpResult = HttpInput;

declare global {
  interface XMLHttpRequest {
    __monitor: HttpInput;
  }
}

const HttpHandler: Handler<HttpInput, HttpResult> = {
  name: EVENT_TYPE.HTTP,
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
          status: status,
        };
        this.__monitor.end = Date.now();
        this.__monitor.elapsed = this.__monitor.end - this.__monitor.start;
        monitor.emit(EVENT_TYPE.HTTP, this.__monitor);
      });
      prevsend.apply(this, [body]);
    }
    prototype.send = send;


    const prevfetch = win.fetch;
    async function fetch(this: Window, input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
      const info: HttpInput = {
        url: input as string,
        method: init?.method || 'GET',
        start: Date.now(),
        request: {
          data: init?.body,
        }
      };
      return prevfetch.apply(this, [input, init]).then((resp) => {
        const copy = resp.clone();
        copy.text().then(v => {
          info.response = { status: copy.status, data: v };
          monitor.emit(EVENT_TYPE.HTTP, info);
        })
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
