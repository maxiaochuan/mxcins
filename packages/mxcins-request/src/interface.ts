// eslint-disable-next-line import/no-cycle
import type { ResponseError } from './utils';
import type MapCache from './MapCache';

export interface ResponseType extends Response {
  useCache?: boolean;
  clone: () => ResponseType;
}

export type IRequestMiddleware = (
  ctx: IRequestContext,
  next: (...args: any[]) => Promise<void>,
) => Promise<void> | void;

export interface IRequestContext<T = unknown> {
  req: { uri: string; options?: IRequestOptions };
  res: null | ResponseType | { data: T; response: ResponseType } | T;
  cache: MapCache;
}

type QueryType = { [x: string]: undefined | string | string[] | QueryType | QueryType[] };

/**
 * queryParams will removed
 */
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
  params?: Record<string, string | number | undefined>;
  query?: QueryType;
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

export interface IRequestResponse<T = unknown> {
  data: T;
  response: ResponseType;
}

export interface GraphqlQueryRequestMethod<R = false> {
  <T = unknown>(url: string, options: IRequestOptionsWithResponse): Promise<IRequestResponse<T>>;
  <T = unknown>(url: string, options: IRequestOptionsWithoutResponse): Promise<T>;
  <T = unknown>(url: string, options?: IRequestOptionsInit): R extends true
    ? Promise<IRequestResponse<T>>
    : Promise<T>;
}

export interface IRequestMethod<R = false> {
  <T = unknown>(url: string, options: IRequestOptionsWithResponse): Promise<IRequestResponse<T>>;
  <T = unknown>(url: string, options: IRequestOptionsWithoutResponse): Promise<T>;
  <T = unknown>(url: string, options?: IRequestOptionsInit): R extends true
    ? Promise<IRequestResponse<T>>
    : Promise<T>;
  get: IRequestMethod<R>;
  post: IRequestMethod<R>;
  delete: IRequestMethod<R>;
  put: IRequestMethod<R>;
  patch: IRequestMethod<R>;
  rpc: IRequestMethod<R>;
  use: (handler: IRequestMiddleware) => void;
  query: IRequestMethod<R>;
}
