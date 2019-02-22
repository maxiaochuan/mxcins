import 'whatwg-fetch';
import { IFetchOptions } from '../Fetch';
import defaultInterceptor from './defaultInterceptor';

export type IReqInterceptorHandler = (
  uri: string,
  options: IFetchOptions,
) => { uri?: string; options?: IFetchOptions };
export type IRespInterceptorHandler = (resp: Response, options: IFetchOptions) => Response;

const reqInterceptors: IReqInterceptorHandler[] = [];
const respInterceptors: IRespInterceptorHandler[] = [];

function fetch(uri: string, options: IFetchOptions) {
  if (typeof uri !== 'string') {
    throw new Error('uri MUST be a string');
  }

  reqInterceptors.concat([defaultInterceptor]).forEach(handler => {
    const ret = handler(uri, options);
    uri = ret.uri || uri;
    options = ret.options || options;
  });

  options.method = options.method ? options.method.toUpperCase() : 'GET';

  let response = window.fetch(uri, options);

  respInterceptors.forEach(handler => {
    response = response.then(resp => handler(resp, options));
  });

  return response;
}

fetch.interceptors = {
  request: {
    use: (handler: IReqInterceptorHandler) => {
      reqInterceptors.push(handler);
    },
  },
  response: {
    use: (handler: IRespInterceptorHandler) => {
      respInterceptors.push(handler);
    },
  },
};

export default fetch;
