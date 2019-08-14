import { MapCache, ResponseError } from './utils';

export interface IResponse extends Response {
  useCache?: boolean;
  clone: () => IResponse;
}

export type IRequestMiddleware = (
  ctx: IRequestContext,
  next: (...args: any[]) => Promise<void>,
) => Promise<void> | void;

export interface IRequestContext<T = any> {
  req: { uri: string; options?: IRequestOptions };
  res: null | IResponse | { data: T; response: IResponse } | T;
  cache: MapCache;
}

export interface IRequestOptionsInit extends RequestInit {
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

export interface IRequestOptions extends IRequestOptionsInit {
  getResponse?: boolean;
}
export interface IRequestOptionsWithoutResponse extends IRequestOptionsInit {
  getResponse: false;
}
export interface IRequestOptionsWithResponse extends IRequestOptionsInit {
  getResponse: true;
}

export interface IRequestResponse<T = any> {
  data: T;
  response: IResponse;
}

export interface IRequestMethod<R = false> {
  <T = any>(url: string, options: IRequestOptionsWithResponse): Promise<IRequestResponse<T>>;
  <T = any>(url: string, options: IRequestOptionsWithoutResponse): Promise<T>;
  <T = any>(url: string, options?: IRequestOptionsInit): R extends true
    ? Promise<IRequestResponse<T>>
    : Promise<T>;
  get: IRequestMethod<R>;
  post: IRequestMethod<R>;
  delete: IRequestMethod<R>;
  put: IRequestMethod<R>;
  patch: IRequestMethod<R>;
  rpc: IRequestMethod<R>;
  use: (handler: IRequestMiddleware) => void;
}
