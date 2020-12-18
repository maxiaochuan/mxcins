// eslint-disable-next-line max-classes-per-file, import/no-cycle
import { ResponseType } from './interface';

export { default as deepmerge } from 'deepmerge';

export const win: Window & typeof globalThis = (() => {
  if (typeof window !== 'undefined') {
    return window;
  }
  if (typeof global !== 'undefined') {
    return global as any;
  }
  // eslint-disable-next-line no-restricted-globals
  if (typeof self !== 'undefined') {
    // eslint-disable-next-line no-restricted-globals
    return self as any;
  }
  return {} as any;
})();

export class RequestError extends Error {
  constructor(text: string) {
    super(text);
    this.name = 'RequestError';
  }
}

export class ResponseError<T = unknown> extends Error {
  public response: ResponseType;

  public data?: T;

  constructor(response: ResponseType, text: string, data?: T) {
    super(text);
    this.name = 'ResponseError';
    this.response = response;
    this.data = data;
  }
}

export function safeJsonParse<T = any>(str: string): T {
  try {
    return JSON.parse(str);
  } catch {
    return str as any;
  }
}
