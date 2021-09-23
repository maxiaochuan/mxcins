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
      const subpathname = target.pathname;
      target = new URL(options.prefix, target);
      target.pathname = `${target.pathname}${subpathname}`.replace(/\/\//, '/');
    } else {
      target.pathname = `${options.prefix}${target.pathname}`.replace(/\/\//, '/');
    }
  }

  if (options.suffix) {
    target.pathname = `${target.pathname}${options.suffix}`.replace(/\/\//, '/');
  }

  if (options.query) {
    const extra =
      typeof options.query === 'string'
        ? qs.parse(options.query, { ignoreQueryPrefix: true })
        : options.query || {};
    query = { ...query, ...(extra as ParsedQs) };
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
