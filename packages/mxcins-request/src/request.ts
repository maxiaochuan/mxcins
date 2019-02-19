import Fetch, { IFetchOptions } from './fetch';

// tslint:disable-next-line:no-empty-interface
export interface IRequestOptions extends IFetchOptions {}

function request(initOptions: IRequestOptions = {}) {
  const instance = (input: string, options: IRequestOptions) => {
    options.headers = { ...initOptions.headers, ...options.headers };

    return new Fetch(input, options).do();
  };

  return instance;
}

export const create = (initOptions: IRequestOptions) => request(initOptions);

export default request();
