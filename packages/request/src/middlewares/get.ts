import * as path2exp from 'path-to-regexp';
import qs, { ParsedQs } from 'qs';
import { RequestMiddleware } from '../interface';
import { win } from '../utils';

/**
 * default method
 * addfix
 * params parser
 * query params parser
 * @param ctx
 * @param next
 */
const get: RequestMiddleware = (ctx, next) => {
  const {
    req: { uri, options = {} },
  } = ctx;

  let target = new URL(uri, win.location?.origin || '');

  let query = qs.parse(target.search, { ignoreQueryPrefix: true });

  if (options.prefix) {
    if (/^https?/.test(options.prefix)) {
      const { pathname } = target;
      const modify = new URL(options.prefix, target);
      modify.pathname = `${modify.pathname}${pathname}`.replace(/\/\//, '/');
      target = modify;
    } else {
      target.pathname = `${options.prefix}${target.pathname}`.replace(/\/\//, '/');
    }
  }

  if (options.suffix) {
    target.pathname = `${target.pathname}${options.suffix}`.replace(/\/\//, '/');
  }

  if (options.query) {
    query = { ...query, ...(options.query as ParsedQs) };
  }

  target.search = qs.stringify(query, { addQueryPrefix: true, arrayFormat: 'brackets' });

  if (options.params && Object.keys(options.params).length > 0) {
    target.pathname = path2exp.compile(target.pathname)(options.params);
  }

  // eslint-disable-next-line unicorn/consistent-destructuring
  ctx.req.uri = target.toString();
  options.method = options.method ? options.method.toUpperCase() : 'GET';
  // eslint-disable-next-line unicorn/consistent-destructuring
  ctx.req.options = options;

  return next();
};

export default get;
