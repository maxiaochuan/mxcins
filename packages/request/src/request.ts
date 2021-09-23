/* eslint-disable @typescript-eslint/no-explicit-any */
import deepmerge from 'deepmerge';
import Core from './Core';
import {
  RequestOptions,
  RequestOptionsInit,
  RequestGraphqlQueryMethod,
  METHOD_TYPES,
  RequestDocument,
  ParamsType,
  RequestMethod,
} from './interface';
import { builtins } from './middlewares';
import GraphqlClient from './GraphqlClient';

export const extend = (init: RequestOptionsInit = {}): RequestMethod => {
  const core = new Core(init, builtins);
  // 2021-06-01 18:33:32 主要解决deepmerge会使formdata变成object的问题
  const instance: any = (uri: string, options: RequestOptions = {}) =>
    core.request(uri, { ...deepmerge(init, options), data: options.data });

  instance.use = core.use.bind(core);
  for (const method of METHOD_TYPES) {
    instance[method] = (uri: string, options: RequestOptions) =>
      instance(uri, { ...options, method });
  }

  const query: RequestGraphqlQueryMethod = (
    uri: string,
    document: RequestDocument,
    variables?: ParamsType,
  ) => new GraphqlClient(uri, init).request(document, variables);

  instance.query = query;
  return instance;
};

export default extend({});
