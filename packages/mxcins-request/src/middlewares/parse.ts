/* eslint-disable consistent-return */
import { RequestMidd, ResponseType } from '../interface';
import { ResponseError, safeJsonParse } from '../utils';

const parse: RequestMidd = async (ctx, next) => {
  const {
    req: { options = {} },
  } = ctx;
  const res = ctx.res as ResponseType;
  if (!res || !res.clone) {
    return next();
  }

  const copy = res.clone();
  copy.useCache = res.useCache || false;

  const { responseType = 'json', getResponse } = options;

  await next();

  const body =
    responseType === 'json' || responseType === 'text'
      ? await res.text().then(safeJsonParse)
      : await res[responseType]();
  if (copy.status >= 200 && copy.status < 300) {
    if (getResponse) {
      ctx.res = { data: body, response: copy };
      return;
    }
    ctx.res = body;
    return;
  }
  throw new ResponseError(copy, 'Http Error', body);
};

export default parse;
