/* eslint-disable no-restricted-globals */
// eslint-disable-next-line max-classes-per-file
import { ResponseType } from './interface';

export { default as deepmerge } from 'deepmerge';

export const win: Window = (() => {
  if (typeof window !== 'undefined') {
    return window;
  }
  if (typeof global !== 'undefined') {
    return global as unknown as Window;
  }
  if (typeof self !== 'undefined') {
    return self as unknown as Window;
  }
  return {} as unknown as Window;
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

export function safeJsonParse<T extends unknown | string = unknown>(str: string): T {
  try {
    return JSON.parse(str);
  } catch {
    return str as T;
  }
}
