import Fetch, { IFetchOptions } from './Fetch';
import fetch, { IReqInterceptorHandler, IRespInterceptorHandler } from './base/fetch';

// tslint:disable-next-line:no-empty-interface
export interface IRequestOptions extends IFetchOptions {}

export interface IRequestOptionsWithResponse extends IFetchOptions {
  getResponse: true;
}
export interface IRequestOptionsWithoutResponse extends IFetchOptions {
  getResponse: false;
}

export interface IRequestResponse<T = any> {
  data: T;
  response: Response;
}

// export type

export interface IRequestMethod<R = false> {
  <T = any>(uri: string, options: IRequestOptionsWithResponse): Promise<IRequestResponse<T>>;
  <T = any>(uri: string, options: IRequestOptionsWithoutResponse): Promise<T>;
  <T = any>(url: string, options?: IRequestOptions): R extends true
    ? Promise<IRequestResponse<T>>
    : Promise<T>;
  interceptors: {
    request: {
      use: (handler: IReqInterceptorHandler) => void;
    };
    response: {
      use: (handler: IRespInterceptorHandler) => void;
    };
  };
}

const request = (initOptions: IRequestOptions = {}) => {
  const instance: IRequestMethod = (input: string, options: IRequestOptions = {}) => {
    /**
     * 合并options
     */
    options.headers = { ...initOptions.headers, ...options.headers };
    options.params = { ...initOptions.params, ...options.params };
    options = { ...initOptions, ...options };

    return new Fetch(input, options).do();
  };

  instance.interceptors = fetch.interceptors;

  return instance;
};

export const create = (initOptions: IRequestOptions) => request(initOptions);

export default request();
