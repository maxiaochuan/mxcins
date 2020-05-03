import * as path2exp from 'path-to-regexp';
import qs from 'qs';
import { IRequestMiddleware } from '../interface';
import { win } from '../utils';

/**
 * default method
 * addfix
 * params parser
 * query params parser
 * @param ctx
 * @param next
 */
const get: IRequestMiddleware = (ctx, next) => {
  const {
    req: { uri, options = {} },
  } = ctx;

  let target = new URL(uri, win.location?.origin || '');
  let query = qs.parse(target.search, { ignoreQueryPrefix: true });

  if (options.prefix) {
    if (/^https?/.test(options.prefix)) {
      const subpathname = target.pathname;
      target = new URL(options.prefix, target);
      target.pathname = `${target.pathname}${subpathname}`;
    } else {
      target.pathname = `${options.prefix}${target.pathname}`;
    }
  }

  if (options.suffix) {
    target.pathname = `${target.pathname}${options.suffix}`;
  }

  if (options.query) {
    const extra =
      typeof options.query === 'string'
        ? qs.parse(options.query, { ignoreQueryPrefix: true })
        : options.query || {};
    query = { ...query, ...extra };
  }

  target.search = qs.stringify(query, { addQueryPrefix: true, arrayFormat: 'brackets' });

  if (options.params && Object.keys(options.params).length > 0) {
    target.pathname = path2exp.compile(target.pathname)(options.params);
  }

  ctx.req.uri = target.toString();
  options.method = options.method ? options.method.toUpperCase() : 'GET';
  ctx.req.options = options;

  return next();
};

export default get;
