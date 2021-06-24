/* eslint-disable @typescript-eslint/no-explicit-any */
import { print } from 'graphql';
import type {
  RequestDocument,
  ParamsType,
  RequestMiddleware,
  RequestOptions,
  ResponseType,
} from './interface';
import { builtins } from './middlewares';
import Core from './Core';
import { ResponseError } from './utils';

export function resolveRequestDocument(document: RequestDocument): string {
  if (typeof document === 'string') return document;
  return print(document);
}

export default class GraphQLClient {
  private uri: string;

  private core: Core;

  private options: RequestOptions;

  constructor(uri: string, options: RequestOptions = {}) {
    this.uri = uri;
    this.core = new Core(options, builtins);
    this.options = options;
  }

  public use(m: RequestMiddleware): this {
    this.core.use(m);
    return this;
  }

  /**
   * Send a GraphQL document to the server.
   */
  async request<T = any, V = ParamsType>(document: RequestDocument, variables?: V): Promise<T> {
    const response: any = await this.core.request(this.uri, {
      ...this.options,
      method: 'post',
      getResponse: true,
      data: {
        query: resolveRequestDocument(document),
        variables,
      },
    });

    const resp = response as { response: ResponseType; data: { data: T } & { errors?: any[] } };
    /** graphql errors in data */
    if (resp.data.errors) {
      throw new ResponseError(resp.response, 'Graphql Error', resp.data.errors);
    }

    return response.data.data;
  }
}
