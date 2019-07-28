import fetch, { IInterceptors } from './base/fetch';
import Fetch from './Fetch';
import { MapCache, ResponseError } from './utils';

export interface IRequestInitOptions extends RequestInit {
  requestType?: 'json' | 'form' | 'formdata';
  responseType?: 'json' | 'text' | 'blob';
  data?: any;
  timeout?: number;
  errorHandler?: (error: ResponseError) => any;

  useCache?: boolean;
  cacheSize?: number;
  ttl?: never;

  prefix?: string;
  suffix?: string;
  params?: { [x: string]: any };
  queryParams?: { [x: string]: any };
}

export interface IRequestOptions extends IRequestInitOptions {
  getResponse?: boolean;
}

export interface IRequestOptionsWithResponse extends IRequestInitOptions {
  getResponse: true;
}

export interface IRequestOptionsWithoutResponse extends IRequestInitOptions {
  getResponse: false;
}

export interface IRequestResponse<T = any> {
  data: T;
  response: Response;
}

export interface IRequestMethod<R = false> {
  <T = any>(uri: string, options: IRequestOptionsWithResponse): Promise<IRequestResponse<T>>;
  <T = any>(uri: string, options: IRequestOptionsWithoutResponse): Promise<T>;
  <T = any>(uri: string, options?: IRequestInitOptions): R extends true
    ? Promise<IRequestResponse<T>>
    : Promise<T>;
  interceptors: IInterceptors;
}

export interface IFactory {
  (options: IRequestOptionsWithResponse): IRequestMethod<true>;
  (options: IRequestOptionsWithoutResponse): IRequestMethod<false>;
  (options?: IRequestOptions): IRequestMethod;
}

const request = (initOptions: IRequestInitOptions = {}) => {
  const cache = new MapCache(initOptions);
  const instance: IRequestMethod = <T>(uri: string, options: IRequestInitOptions = {}) => {
    options.headers = { ...initOptions.headers, ...options.headers };
    options.params = { ...initOptions.headers, ...options.params };
    options = { ...initOptions, ...options };
    // 2019-03-26 17:16:45 为了cache在初始化之前加入method
    options.method = options.method || 'get';

    return new Fetch(uri, options, cache).do<T>();
  };

  instance.interceptors = fetch.interceptors;

  return instance;
};

export const factory: IFactory = <R extends boolean>(options: IRequestOptions = {}) =>
  request(options) as IRequestMethod<R>;

export default request();
