import { IRequestContext } from '../src/interface';
import { post as postMiddleware } from '../src/middlewares';
import MapCache from '../src/MapCache';

const ctx: IRequestContext = { req: { uri: `/response` }, res: undefined, cache: new MapCache({}) };

const next = () => Promise.resolve();

describe('postMiddleware', () => {
  it('method', async () => {
    await postMiddleware(ctx, next);
    expect(ctx.req.options && ctx.req.options.method).toBe(undefined);

    ctx.req.options = { method: 'get' };
    await postMiddleware(ctx, next);
    expect(ctx.req.options.method).toBe('get');
  });

  it('request type', async () => {
    const o = { method: 'post' };
    ctx.req = { uri: '/response', options: o };
    await postMiddleware(ctx, next);
    expect(ctx.req.options).toBe(o);

    ctx.req = { ...ctx.req, options: { method: 'post', data: { a: 'a' } } };
    await postMiddleware(ctx, next);
    expect(ctx.req.options && ctx.req.options.body).toBe(JSON.stringify({ a: 'a' }));
  });
});
