/* eslint-disable unicorn/no-null, import/no-extraneous-dependencies */
import { cloneDeep } from 'lodash';
import { IRequestContext } from '../src/interface';
import { get as getMiddleware } from '../src/middlewares';
import MapCache from '../src/MapCache';

const DEFAULT_CTX: IRequestContext = {
  req: { uri: `/response` },
  res: null,
  cache: new MapCache({}),
};
const next = () => Promise.resolve();

describe('getMiddleware', () => {
  it('uri parse', async () => {
    const ctx = cloneDeep(DEFAULT_CTX);
    ctx.req.uri = '/response?a[]=1&a[]=2';
    ctx.req.options = { query: { b: ['1', '2'] } };
    await getMiddleware(ctx, next);
    expect(ctx.req.uri).toBe('http://localhost/response?a%5B%5D=1&a%5B%5D=2&b%5B%5D=1&b%5B%5D=2');
  });
  it('method', async () => {
    const ctx = cloneDeep(DEFAULT_CTX);
    await getMiddleware(ctx, next);
    expect(ctx.req.options && ctx.req.options.method).toBe('GET');

    ctx.req.options = { method: 'post' };
    await getMiddleware(ctx, next);
    expect(ctx.req.options.method).toBe('POST');
  });

  it('uri addfix', async () => {
    const ctx = cloneDeep(DEFAULT_CTX);
    ctx.req = { uri: '/response', options: { query: { a: 'a' }, prefix: '/api' } };
    await getMiddleware(ctx, next);
    expect(ctx.req.uri).toBe('http://localhost/api/response?a=a');

    ctx.req = {
      uri: 'https://google.com/response',
      options: { query: { a: 'a' }, prefix: '/api' },
    };
    await getMiddleware(ctx, next);
    expect(ctx.req.uri).toBe('https://google.com/api/response?a=a');

    ctx.req = { uri: '/response?b=b', options: { query: { a: 'a' }, suffix: '.json' } };
    await getMiddleware(ctx, next);
    expect(ctx.req.uri).toBe('http://localhost/response.json?b=b&a=a');

    ctx.req = {
      uri: '/response?b=b',
      options: { query: { a: 'a' }, prefix: 'https://google.com/api', suffix: '.json' },
    };
    await getMiddleware(ctx, next);
    expect(ctx.req.uri).toBe('https://google.com/api/response.json?b=b&a=a');
  });
});
