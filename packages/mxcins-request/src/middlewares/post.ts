import qs from 'qs';
import { IRequestMiddleware } from '../interface';

const isFormData = (f: any) =>
  f && f.append && typeof f.append === 'function' && f.delete && typeof f.delete === 'function';

/**
 * method check;
 * request type;
 * @param ctx
 * @param next
 */
const post: IRequestMiddleware = async (ctx, next) => {
  const {
    req: { options = {} },
  } = ctx;

  const { method = 'get' } = options;
  if (!['post', 'put', 'patch', 'delete'].includes(method.toLowerCase())) {
    return next();
  }

  const { requestType = 'json', data } = options;
  if (data) {
    const t = Object.prototype.toString.call(data);
    /**
     * 2019-08-14 18:57:17  为了解决rn  FormData 类型为 [object Object]的问题 加入 isFormData 判断
     */
    if ((t === '[object Object]' || t === '[object Array]') && !isFormData(data)) {
      if (requestType === 'json') {
        options.headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
          ...options.headers,
        };
        options.body = JSON.stringify(data);
      } else if (requestType === 'form') {
        options.headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          ...options.headers,
        };
        options.body = qs.stringify(data);
      }
    } else {
      options.headers = {
        Accept: 'application/json',
        ...options.headers,
      };

      options.body = data;
    }
  }

  ctx.req.options = options;

  return next();
};

export default post;
