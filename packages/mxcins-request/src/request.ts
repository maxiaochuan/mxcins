import Core from './Core';
import {
  IRequestMethod,
  IRequestMiddleware,
  IRequestOptions,
  IRequestOptionsInit,
} from './interface';
import * as mw from './middlewares';
import { extend as graphqlExtend } from './graphql';

const creator = (
  initOptions: IRequestOptionsInit = {},
  initMiddlewares: IRequestMiddleware[] = [],
): IRequestMethod => {
  const core = new Core(initOptions, initMiddlewares);

  const instance: any = (uri: string, options: IRequestOptions = {}) => {
    const merged: IRequestOptions = {
      ...initOptions,
      ...options,
      headers: {
        ...initOptions.headers,
        ...options.headers,
      },
      params: {
        ...initOptions.params,
        ...options.params,
      },
      query: {
        ...initOptions.query,
        ...options.query,
      },
      method: (options.method || 'get').toLowerCase(),
    };

    return core.request(uri, merged);
  };

  instance.use = core.use.bind(core);

  ['get', 'post', 'delete', 'put', 'rpc', 'patch'].forEach(method => {
    instance[method] = (uri: string, options: IRequestOptions) =>
      instance(uri, { ...options, method });
  });

  instance.query = graphqlExtend(initOptions);

  return instance;
};

export const builtins = [mw.post, mw.get, mw.fetch, mw.parse];

export const extend = (init: IRequestOptionsInit = {}): IRequestMethod => creator(init, builtins);

export default creator({}, builtins);
