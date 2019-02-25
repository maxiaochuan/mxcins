import { stringify } from 'query-string';
import { IReqInterceptor } from './fetch';

const defaultInterceptor: IReqInterceptor = (uri, originOptions) => {
  const options = { ...originOptions };

  const method = options.method ? options.method.toLowerCase() : 'get';

  if (method === 'post' || method === 'put' || method === 'patch') {
    const { requestType = 'json', data } = options;
    if (data) {
      const dataType = Object.prototype.toString.call(data);
      if (dataType === '[object Object]' || dataType === '[object Array]') {
        if (requestType === 'json') {
          options.headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json;chartset=UTF-8',
            ...options.headers,
          };
          options.body = JSON.stringify(data);
        } else if (requestType === 'form') {
          options.headers = {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded;chartset=UTF-8',
            ...options.headers,
          };
          options.body = stringify(data);
        }
      } else {
        options.headers = {
          Accept: 'application/json',
          ...options.headers,
        };

        options.body = data;
      }
    }
  }

  if (options.params && Object.keys(options.params).length > 0) {
    const str = uri.indexOf('?') !== -1 ? '&' : '?';
    uri = `${uri}${str}${stringify(options.params)}`;
  }

  options.method = method.toUpperCase();

  return {
    uri,
    options,
  };
};

export default defaultInterceptor;
