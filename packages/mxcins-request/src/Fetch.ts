import 'whatwg-fetch';
import fetch from './base/fetch';
import { IRequestOptions } from './request';
import { MapCache, RequestError, ResponseError, safeJsonParse } from './utils';

export type IInstance = Promise<Response>;

export default class Fetch {
  private uri: string;
  private cache: MapCache;
  private options: IRequestOptions;
  constructor(uri: string, options: IRequestOptions = {}, cache: MapCache) {
    this.uri = uri;
    this.cache = cache;
    this.options = options;
    this.addFix();
  }
  public async do<T>() {
    const useCache = this.options.method === 'get' && this.options.useCache;
    if (useCache) {
      const { params, queryParams } = this.options;
      const cachedResponse = this.cache.get({ uri: this.uri, params, queryParams });
      if (cachedResponse) {
        return this.parseResponse<T>(cachedResponse);
      }
    }

    let instance = fetch(this.uri, this.options);
    instance = this.wrappedTimeout(instance);
    instance = this.wrappedCache(instance, this.options.useCache);

    const response = await instance;
    return this.parseResponse<T>(response);
  }

  private async wrappedCache(instance: IInstance, useCache?: boolean): IInstance {
    if (useCache) {
      const { params, queryParams, ttl } = this.options;
      return instance.then(response => {
        if (response.status === 200) {
          const copy = response.clone();
          this.cache.set({ uri: this.uri, params, queryParams }, copy, ttl);
        }
        return response;
      });
    }
    return instance;
  }

  private wrappedTimeout(instance: IInstance): IInstance {
    const { timeout = 0 } = this.options;
    if (timeout > 0) {
      return Promise.race<Response, Response>([
        new Promise((_, reject) => {
          setTimeout(() => reject(new RequestError(`timeout of ${timeout}ms exceeded`)), timeout);
        }),
        instance,
      ]);
    } else {
      return instance;
    }
  }

  /**
   * @param {Response} response
   */
  private async parseResponse<T>(response: Response) {
    const { responseType = 'json', getResponse = false } = this.options;

    let data: T;

    try {
      if (responseType === 'json' || responseType === 'text') {
        const str = await response.text();
        data = safeJsonParse(str);
      } else {
        try {
          data = ((await response[responseType]()) as unknown) as T;
        } catch (error) {
          throw new ResponseError(response, 'responseType not support');
        }
      }

      if (response.status >= 200 && response.status < 300) {
        return getResponse ? { response, data } : data;
      } else {
        throw new ResponseError(response, 'http error', data);
      }
    } catch (error) {
      return this.handleError<T>(error);
    }
  }

  private handleError<T>(error: ResponseError): T {
    const { errorHandler } = this.options;
    if (errorHandler) {
      try {
        return errorHandler(error);
      } catch (e) {
        throw e;
      }
    } else {
      throw error;
    }
  }

  /**
   * 增加前缀和后缀
   */
  private addFix() {
    const { prefix, suffix } = this.options;
    if (prefix) {
      this.uri = `${prefix}${this.uri}`;
    }
    if (suffix) {
      this.uri = `${this.uri}${suffix}`;
    }
  }
}
