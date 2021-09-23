import 'whatwg-fetch';
import { RequestMiddleware, ResponseType } from '../interface';
import { RequestError, win } from '../utils';

export const asyncTimeout = async (msec: number): Promise<unknown> =>
  // eslint-disable-next-line promise/param-names
  new Promise((_, reject) => {
    win.setTimeout(() => reject(new RequestError(`timeout of ${msec}ms exceeded`)), msec);
  });

/**
 * timeout
 * cache
 * @param ctx
 * @param next
 */
const fetch: RequestMiddleware = async (ctx, next) => {
  const {
    req: { uri, options = {} },
    cache,
  } = ctx;
  if (!win.fetch) {
    throw new Error("window fetch don't exist!");
  }

  const { method = 'get', params, query, useCache, timeout = 0 } = options;

  const needCache = method.toLowerCase() === 'get' && useCache;
  if (needCache) {
    const responseCache = cache.get({ uri, params, query });
    if (responseCache) {
      const clone = responseCache.clone();
      clone.useCache = true;
      ctx.res = clone;
      return next();
    }
  }

  const f = win.fetch(uri, options);
  const promise: Promise<ResponseType> =
    timeout > 0 ? (Promise.race([f, asyncTimeout(timeout)]) as Promise<ResponseType>) : f;

  const res = await promise;

  if (needCache && res.status === 200) {
    const copy = res.clone();
    copy.useCache = true;
    cache.set({ uri, params, query }, copy);
  }
  ctx.res = res;
  return next();
};

export default fetch;
