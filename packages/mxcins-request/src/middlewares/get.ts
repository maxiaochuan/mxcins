import path2exp from 'path-to-regexp';
import qs from 'qs';
import Parser from 'url-parse';
import { IRequestMiddleware } from '../interface';

/**
 * default method
 * params parser
 * query params parser
 * @param ctx
 * @param next
 */
const get: IRequestMiddleware = (ctx, next) => {
  const {
    req: { options = {} },
  } = ctx;

  if (options.queryParams && Object.keys(options.queryParams).length > 0) {
    const str = ctx.req.uri.indexOf('?') === -1 ? '?' : '&';
    ctx.req.uri = `${ctx.req.uri}${str}${qs.stringify(options.queryParams)}`;
  }

  if (options.params) {
    const parser = new Parser(ctx.req.uri);
    parser.set('pathname', path2exp.compile(parser.pathname)(options.params));
    ctx.req.uri = parser.toString();
  }

  options.method = options.method ? options.method.toUpperCase() : 'GET';
  ctx.req.options = options;

  return next();
};

export default get;
