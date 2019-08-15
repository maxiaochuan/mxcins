import { IRequestContext } from '../src/interface';
import { postMiddleware } from '../src/middlewares';
import { MapCache } from '../src/utils';

const ctx: IRequestContext = { req: { uri: `/response` }, res: null, cache: new MapCache({}) };

describe('postMiddleware', () => {
  it('method', async () => {
    const next = () => Promise.resolve();
    await postMiddleware(ctx, next);
    expect(ctx.req.options && ctx.req.options.method).toBe(undefined);

    ctx.req.options = { method: 'get' };
    await postMiddleware(ctx, next);
    expect(ctx.req.options.method).toBe('get');
  });

  it('request type', async () => {
    const next = () => Promise.resolve();
    const o = { method: 'post' };
    ctx.req = { uri: '/response', options: o };
    await postMiddleware(ctx, next);
    expect(ctx.req.options).toBe(o);

    ctx.req = { ...ctx.req, options: { method: 'post', data: { a: 'a' } } };
    await postMiddleware(ctx, next);
    expect(ctx.req.options && ctx.req.options.body).toBe(JSON.stringify({ a: 'a' }));
  });
});
