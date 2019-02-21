import Fetch, { IFetchOptions } from './fetch';
import fetch from './base/fetch';

// tslint:disable-next-line:no-empty-interface
export interface IRequestOptions extends IFetchOptions {}

function request(initOptions: IRequestOptions = {}) {
  const instance = (input: string, options: IRequestOptions = {}) => {
    options.headers = { ...initOptions.headers, ...options.headers };
    options.params = { ...initOptions.params, ...options.params };
    options = { ...initOptions, ...options };

    return new Fetch(input, options).do();
  };

  instance.interceptors = fetch.interceptors;

  return instance;
}

export const create = (initOptions: IRequestOptions) => request(initOptions);

export default request();
