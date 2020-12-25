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
  const instance: any = (uri: string, options: RequestOptions = {}) =>
    core.request(uri, deepmerge(init, options));

  instance.use = core.use.bind(core);
  METHOD_TYPES.forEach(method => {
    instance[method] = (uri: string, options: RequestOptions) =>
      instance(uri, { ...options, method });
  });

  const query: RequestGraphqlQueryMethod = (
    uri: string,
    document: RequestDocument,
    variables?: ParamsType,
  ) => new GraphqlClient(uri, init).request(document, variables);

  instance.query = query;
  return instance;
};

export default extend({});
