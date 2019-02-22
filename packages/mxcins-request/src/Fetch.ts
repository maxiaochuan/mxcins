import 'whatwg-fetch';
import { RequestError, ResponseError, safeJsonParse } from './utils';
import fetch from './base/fetch';

// tslint:disable-next-line:no-empty-interface
export interface IFetchOptions extends RequestInit {
  params?: { [x: string]: string | number };
  requestType?: 'json' | 'form';
  responseType?: 'json' | 'text' | 'blob';
  data?: any;
  getResponse?: boolean;
  timeout?: number;
  errorHandler?: (error: ResponseError) => any;

  prefix?: string;
  suffix?: string;
}

export type IInstance = Promise<Response>;

export default class Fetch {
  private uri: string;
  private options: IFetchOptions;
  constructor(uri: string, options: IFetchOptions = {}) {
    this.uri = uri;
    this.options = options;
    this.addFix();
  }
  public do() {
    let instance = fetch(this.uri, this.options);

    instance = this.wrappedTimeout(instance);
    return this.parseResponse(instance);
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
  private parseResponse(instance: IInstance) {
    const { responseType = 'json', getResponse = false } = this.options;
    return new Promise<{ data: any; response: Response }>((resolve, reject) => {
      let copy: Response;
      instance
        .then(response => {
          copy = response.clone();
          if (responseType === 'json' || responseType === 'text') {
            return response.text().then(safeJsonParse);
          } else {
            try {
              return response[responseType]();
            } catch (e) {
              throw new ResponseError(copy, 'responseType not support');
            }
          }
        })
        .then(data => {
          if (copy.status >= 200 && copy.status < 300) {
            if (getResponse) {
              resolve({
                data,
                response: copy,
              });
            } else {
              resolve(data);
            }
          } else {
            throw new ResponseError(copy, 'http error', data);
          }
        })
        .catch(error => this.handleError(error, { resolve, reject }));
    });
  }
  private handleError(error: ResponseError, { resolve, reject }: { resolve: any; reject: any }) {
    const { errorHandler } = this.options;
    if (errorHandler) {
      try {
        const data = errorHandler(error);
        resolve(data);
      } catch (e) {
        reject(e);
      }
    } else {
      reject(error);
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
