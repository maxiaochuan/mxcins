import { IRequestContext } from '../src/interface';
import { getMiddleware } from '../src/middlewares';
import { MapCache } from '../src/utils';

const ctx: IRequestContext = { req: { uri: `/response` }, res: null, cache: new MapCache({}) };

describe('getMiddleware', () => {
  it('method', async () => {
    const next = () => Promise.resolve();
    await getMiddleware(ctx, next);
    expect(ctx.req.options && ctx.req.options.method).toBe('GET');

    ctx.req.options = { method: 'post' };
    await getMiddleware(ctx, next);
    expect(ctx.req.options.method).toBe('POST');
  });

  it('uri query', async () => {
    const next = () => Promise.resolve();
    ctx.req = { uri: '/response', options: { queryParams: { a: 'a' } } };
    await getMiddleware(ctx, next);
    expect(ctx.req.uri).toBe('/response?a=a');

    ctx.req = { uri: '/response?b=b', options: { queryParams: { a: 'a' } } };
    await getMiddleware(ctx, next);
    expect(ctx.req.uri).toBe('/response?b=b&a=a');
  });
});
