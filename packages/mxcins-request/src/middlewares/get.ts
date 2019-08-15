import path2exp from 'path-to-regexp';
import Parser from 'url-parse';
import { IRequestMiddleware } from '../interface';

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

  const target = new Parser(uri, {}, true);

  if (options.prefix) {
    target.set('pathname', `${options.prefix}${target.pathname}`);
  }

  if (options.suffix) {
    target.set('pathname', `${target.pathname}${options.suffix}`);
  }

  if (options.queryParams && Object.keys(options.queryParams).length > 0) {
    target.set('query', { ...target.query, ...options.queryParams });
  }

  if (options.params && Object.keys(options.params).length > 0) {
    target.set('pathname', path2exp.compile(target.pathname)(options.params));
  }

  ctx.req.uri = target.toString();
  options.method = options.method ? options.method.toUpperCase() : 'GET';
  ctx.req.options = options;

  return next();
};

export default get;
