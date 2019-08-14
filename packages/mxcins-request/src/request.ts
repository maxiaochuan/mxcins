import Core from './Core';
import {
  IRequestMethod,
  IRequestMiddleware,
  IRequestOptions,
  IRequestOptionsInit,
} from './interface';
import { fetchMiddleware, getMiddleware, parseMiddleware, postMiddleware } from './middlewares';

const request = (
  initOptions: IRequestOptionsInit = {},
  ms: IRequestMiddleware[] = [],
): IRequestMethod => {
  const core = new Core(initOptions, ms);

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
      queryParams: {
        ...initOptions.queryParams,
        ...options.queryParams,
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

  return instance;
};

export const extendMiddlewares = [postMiddleware, getMiddleware, fetchMiddleware, parseMiddleware];
export const fetchMiddlewares = [postMiddleware, getMiddleware, fetchMiddleware];

export const extend = (init: IRequestOptionsInit = {}) => request(init, extendMiddlewares);

export const fetch = request({}, fetchMiddlewares);

export default request({}, extendMiddlewares);
