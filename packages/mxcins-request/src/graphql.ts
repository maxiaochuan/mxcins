import Core from './Core';
import {
  IRequestMiddleware,
  IRequestOptions,
  IRequestOptionsInit,
  GraphqlQueryRequestMethod,
} from './interface';
import * as mw from './middlewares';
import { deepmerge } from './utils';

const creator = (
  initOptions: IRequestOptionsInit = {},
  initMiddlewares: IRequestMiddleware[] = [],
) => {
  const core = new Core(initOptions, initMiddlewares);
  const instance = (uri: string, options: IRequestOptions = {}) => {
    const merged = deepmerge(initOptions, options);
    return core.request(uri, merged);
  };

  return instance as GraphqlQueryRequestMethod;
};

export const builtins = [mw.graphql, mw.post, mw.get, mw.fetch, mw.parse];

export const extend = (init: IRequestOptionsInit = {}): GraphqlQueryRequestMethod =>
  creator(init, builtins);
