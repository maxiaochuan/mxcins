import Fetch from './Fetch';
import fetch from './base/fetch';
import { ResponseError } from './utils';

export interface IRequestOptionsInit extends RequestInit {
  requestType?: 'json' | 'form';
  responseType?: 'json' | 'text' | 'blob';
  data?: any;
  timeout?: number;
  errorHandler?: (error: ResponseError) => any;

  prefix?: string;
  suffix?: string;
  params?: { [x: string]: any };
  queryParams?: { [x: string]: any };
}

export interface IRequestOptions extends IRequestOptionsInit {
  getResponse?: boolean;
}

export interface IRequestOptionsWithResponse extends IRequestOptionsInit {
  getResponse: true;
}

export interface IRequestOptionsWithoutResponse extends IRequestOptionsInit {
  getResponse: false;
}

export interface IRequestResponse<T = any> {
  data: T;
  response: Response;
}

function request(initOptions: IRequestOptionsInit = {}) {
  function instance<T = any>(
    input: string,
    options: IRequestOptionsWithResponse,
  ): Promise<IRequestResponse<T>>;
  function instance<T = any>(input: string, options: IRequestOptionsWithoutResponse): Promise<T>;
  function instance<T = any>(input: string, options?: IRequestOptionsInit): Promise<T>;
  function instance<T = any>(input: string, options: IRequestOptions = {}) {
    options.headers = { ...initOptions.headers, ...options.headers };
    options.params = { ...initOptions.params, ...options.params };
    options = { ...initOptions, ...options };

    return new Fetch(input, options).do<T>();
  }

  instance.interceptors = fetch.interceptors;

  return instance;
}

export const create = (initOptions?: IRequestOptions) => {
  return request(initOptions);
};

export default request();
