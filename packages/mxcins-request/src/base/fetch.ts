import 'whatwg-fetch';
import { IRequestOptions } from '../request';
import defaultInterceptor from './defaultInterceptor';

export type IReqInterceptor = (
  uri: string,
  options: IRequestOptions,
) => { uri?: string; options?: IRequestOptions };
export type IResInterceptor = (resp: Response, options: IRequestOptions) => Response;

export interface IInterceptors {
  request: {
    use: (handler: IReqInterceptor) => void;
  };
  response: {
    use: (handler: IResInterceptor) => void;
  };
}

const reqInterceptors: IReqInterceptor[] = [];
const resInterceptors: IResInterceptor[] = [];

export interface IFetchMethod {
  (uri: string, options: RequestInit): Promise<Response>;
  interceptors: IInterceptors;
}

const fetch: IFetchMethod = (uri, options) => {
  if (typeof uri !== 'string') {
    throw new Error('uri MUST be a string');
  }

  reqInterceptors.concat([defaultInterceptor]).forEach(handler => {
    const ret = handler(uri, options);
    uri = ret.uri || uri;
    options = ret.options || options;
  });

  let response = window.fetch(uri, options);

  resInterceptors.forEach(handler => {
    response = response.then(resp => handler(resp, options));
  });

  return response;
};

fetch.interceptors = {
  request: {
    use: (handler: IReqInterceptor) => {
      reqInterceptors.push(handler);
    },
  },
  response: {
    use: (handler: IResInterceptor) => {
      resInterceptors.push(handler);
    },
  },
};

export default fetch;
