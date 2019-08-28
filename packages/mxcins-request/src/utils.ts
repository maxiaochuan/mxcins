import { IRequestOptions, IResponse } from './interface';

export const root: Window =
  // eslint-disable-next-line no-restricted-globals
  ((typeof self === 'object' && self.self === self && self) as any) ||
  ((typeof global === 'object' && global.global === global && global) as any) ||
  (this as any);

// tslint:disable:max-classes-per-file
export class MapCache {
  private cache: Map<string, IResponse>;

  private timer: { [x: string]: number };

  private maxSize: number;

  constructor(options: IRequestOptions) {
    this.cache = new Map();
    this.timer = {};
    this.maxSize = options.cacheSize || 20;
  }

  public get(k: object) {
    return this.cache.get(JSON.stringify(k));
  }

  public set(k: object, v: Response, ttl = 60000) {
    if (this.maxSize > 0 && this.cache.size >= this.maxSize) {
      const dKey = [...this.cache.keys()][0];
      this.cache.delete(dKey);
      if (this.timer[dKey]) {
        window.clearTimeout(this.timer[dKey]);
      }
    }
    const cacheKey = JSON.stringify(k);
    this.cache.set(cacheKey, v);
    if (ttl > 0) {
      this.timer[cacheKey] = window.setTimeout(() => {
        this.cache.delete(cacheKey);
        delete this.timer[cacheKey];
      }, ttl);
    }
  }

  public delete(k: object) {
    const cacheKey = JSON.stringify(k);
    delete this.timer[cacheKey];
    return this.cache.delete(cacheKey);
  }

  public clear() {
    this.timer = {};
    return this.cache.clear();
  }
}

export class RequestError extends Error {
  constructor(text: string) {
    super(text);
    this.name = 'RequestError';
  }
}

export class ResponseError<T = any> extends Error {
  public response: IResponse;

  public data?: T;

  constructor(response: IResponse, text: string, data?: T) {
    super(text);
    this.name = 'ResponseError';
    this.response = response;
    this.data = data;
  }
}

export function safeJsonParse(str: string) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return str;
  }
}
