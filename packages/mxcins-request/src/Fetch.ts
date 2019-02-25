import 'whatwg-fetch';
import { RequestError, ResponseError, safeJsonParse } from './utils';
import fetch from './base/fetch';
import { IRequestOptions } from './request';

export type IInstance = Promise<Response>;

export default class Fetch {
  private uri: string;
  private options: IRequestOptions;
  constructor(uri: string, options: IRequestOptions = {}) {
    this.uri = uri;
    this.options = options;
    this.addFix();
  }
  public async do<T>() {
    let instance = fetch(this.uri, this.options);

    instance = this.wrappedTimeout(instance);

    const response = await instance;
    return this.parseResponse<T>(response);
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
   * 2019-02-22 15:14:22 data 返回类型 问题 TODO
   * @param instance
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
          data = (await response[responseType]()) as any;
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
