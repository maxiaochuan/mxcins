import { stringify } from 'query-string';
import { IReqInterceptor } from './fetch';

const defaultInterceptor: IReqInterceptor = (uri, originOptions) => {
  const options = { ...originOptions };

  const method = options.method ? options.method.toLowerCase() : 'get';

  if (method === 'post' || method === 'put' || method === 'patch') {
    const { requestType = 'json', data } = options;
    if (data) {
      const dataType = Object.prototype.toString.call(data);
      /**
       * 2019-07-28 15:38:49  为了解决rn  FormData 类型为 [object Object]的问题
       */
      if (requestType === 'formdata') {
        options.headers = {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data;charset=utf-8',
        };
        options.body = data;
      } else if (dataType === '[object Object]' || dataType === '[object Array]') {
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

  const { params, queryParams } = options;
  if (params) {
    try {
      const match = uri.match(/\/:[a-zA-Z]+/g);
      if (match !== null) {
        match.forEach(value => {
          const name = value.replace('/:', '');
          uri = uri.replace(value, `/${params[name]}`);
        });
      }
    } catch (error) {
      throw new Error(`uri: ${uri} compile error`);
    }
  }

  if (queryParams && Object.keys(queryParams).length > 0) {
    const str = uri.indexOf('?') !== -1 ? '&' : '?';
    uri = `${uri}${str}${stringify(queryParams)}`;
  }

  options.method = method.toUpperCase();

  return {
    uri,
    options,
  };
};

export default defaultInterceptor;
