/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line import/no-cycle
import type { DocumentNode } from 'graphql';
import type { ResponseError } from './utils';
import type MapCache from './MapCache';

/**
 * @description Extended Response Type
 * @author Maxiaochuan <mxcins@gmail.com>
 * @date 25-12-2020
 * @export
 * @interface ResponseType
 * @extends {Response}
 */
export interface ResponseType extends Response {
  useCache?: boolean;
  clone: () => ResponseType;
}

export interface RequestMidd {
  (ctx: RequestContext, next: () => Promise<void>): Promise<void> | void;
}

export interface RequestContext<T = unknown> {
  req: { uri: string; options?: RequestOptions };
  res: null | ResponseType | { data: T; response: ResponseType } | T;
  cache: MapCache;
}

export type ParamsType = {
  [x: string]: undefined | number | string | string[] | ParamsType | ParamsType[];
};

/**
 * @description 初始化参数
 * @author Maxiaochuan <mxcins@gmail.com>
 * @date 25-12-2020
 * @export
 * @interface RequestOptionsInit
 * @extends {RequestInit}
 */
export interface RequestOptionsInit extends RequestInit {
  requestType?: 'json' | 'form' | 'formdata';
  responseType?: 'json' | 'text' | 'blob';
  data?: any;
  timeout?: number;
  onError?: (error: ResponseError) => any;
  useCache?: boolean;
  cacheSize?: number;
  ttl?: never;

  prefix?: string;
  suffix?: string;
  params?: ParamsType;
  query?: ParamsType;
}

export interface RequestOptions extends RequestOptionsInit {
  getResponse?: boolean;
}

export interface RequestOptionsWithoutResponse extends RequestOptionsInit {
  getResponse: false;
}

export interface RequestOptionsWithResponse extends RequestOptionsInit {
  getResponse: true;
}

export interface RequestResponse<T = unknown> {
  data: T;
  response: ResponseType;
}

export const tuple = <T extends string[]>(...args: T): T => args;
export const METHOD_TYPES = tuple('get', 'post', 'delete', 'put', 'patch', 'rpc');
type MethodType = typeof METHOD_TYPES[number];

interface SimpleRequestMethod<R = false> {
  <T = unknown>(url: string, options: RequestOptionsWithResponse): Promise<RequestResponse<T>>;
  <T = unknown>(url: string, options: RequestOptionsWithoutResponse): Promise<T>;
  <T = unknown>(url: string, options?: RequestOptionsInit): R extends true
    ? Promise<RequestResponse<T>>
    : Promise<T>;
}

export interface RequestMethod<R = false>
  extends SimpleRequestMethod<R>,
    Record<MethodType, SimpleRequestMethod<R>> {
  use: (handler: RequestMidd) => void;
  query: RequestGraphqlQueryMethod;
}

export type RequestDocument = string | DocumentNode;

export interface RequestGraphqlQueryMethod {
  <T = unknown>(url: string, document: RequestDocument, variables?: ParamsType): Promise<T>;
}
