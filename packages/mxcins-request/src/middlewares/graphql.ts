/* eslint-disable consistent-return */
import { IRequestMiddleware } from '../interface';
import { RequestError } from '../utils';

const query: IRequestMiddleware = async (ctx, next) => {
  const {
    req: { options = {} },
  } = ctx;

  const { params, data } = options;
  if (!data) {
    throw new RequestError('graphql query error, data can not be blank');
  }

  if (typeof data === 'string') {
    ctx.req.options = { ...options, data: { query: data, variables: params } };
  }

  await next();
};

export default query;
