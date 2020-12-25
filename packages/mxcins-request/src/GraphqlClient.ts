/* eslint-disable @typescript-eslint/no-explicit-any */
import { print } from 'graphql';
import type { RequestDocument, RequestOptionsInit, ParamsType } from './interface';
import { builtins } from './middlewares';
import Core from './Core';

export function resolveRequestDocument(document: RequestDocument): string {
  if (typeof document === 'string') return document;
  return print(document);
}

export default class GraphQLClient {
  private uri: string;

  private core: Core;

  constructor(uri: string, options: RequestOptionsInit = {}) {
    this.uri = uri;
    this.core = new Core(options, builtins);
  }

  /**
   * Send a GraphQL document to the server.
   */
  async request<T = any, V = ParamsType>(document: RequestDocument, variables?: V): Promise<T> {
    const response: any = this.core.request(this.uri, {
      data: {
        query: resolveRequestDocument(document),
        variables,
      },
    });
    return response;
  }
}
