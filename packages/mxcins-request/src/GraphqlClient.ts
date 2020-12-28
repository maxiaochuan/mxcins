/* eslint-disable @typescript-eslint/no-explicit-any */
import { print } from 'graphql';
import type { RequestDocument, ParamsType, RequestMiddleware } from './interface';
import { builtins } from './middlewares';
import Core from './Core';
import { MapCacheOptions } from './MapCache';

export function resolveRequestDocument(document: RequestDocument): string {
  if (typeof document === 'string') return document;
  return print(document);
}

export default class GraphQLClient {
  private uri: string;

  private core: Core;

  constructor(uri: string, options: MapCacheOptions = {}) {
    this.uri = uri;
    this.core = new Core(options, builtins);
  }

  public use(m: RequestMiddleware): this {
    this.core.use(m);
    return this;
  }

  /**
   * Send a GraphQL document to the server.
   */
  async request<T = any, V = ParamsType>(document: RequestDocument, variables?: V): Promise<T> {
    const response: any = this.core.request(this.uri, {
      method: 'post',
      data: {
        query: resolveRequestDocument(document),
        variables,
      },
    });
    return response;
  }
}
