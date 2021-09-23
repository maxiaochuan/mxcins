/* eslint-disable unicorn/no-null, import/no-extraneous-dependencies */
import { cloneDeep as copy } from 'lodash';
import type { RequestContext } from '../../src/interface';
import { get as fn } from '../../src/middlewares';
import MapCache from '../../src/MapCache';

const DEFAULT_CTX: RequestContext = {
  req: { uri: `/response` },
  res: null,
  cache: new MapCache({}),
};
const next = () => Promise.resolve();

describe('getMiddleware', () => {
  it('uri parse query object', async () => {
    const ctx = copy(DEFAULT_CTX);
    ctx.req.uri = '/response?a[]=1&a[]=2';
    ctx.req.options = { query: { b: ['1', '2'] } };
    await fn(ctx, next);
    expect(ctx.req.uri).toBe('http://localhost/response?a%5B%5D=1&a%5B%5D=2&b%5B%5D=1&b%5B%5D=2');
  });

  it('uri parse params', async () => {
    const ctx = copy(DEFAULT_CTX);
    ctx.req.uri = '/users/:id';
    ctx.req.options = { params: { id: '1' } };
    await fn(ctx, next);
    expect(ctx.req.uri).toBe('http://localhost/users/1');
  });

  it('method', async () => {
    const ctx = copy(DEFAULT_CTX);
    await fn(ctx, next);
    expect(ctx.req.options && ctx.req.options.method).toBe('GET');

    ctx.req.options = { method: 'post' };
    await fn(ctx, next);
    expect(ctx.req.options.method).toBe('POST');
  });

  it('uri addfix', async () => {
    const ctx = copy(DEFAULT_CTX);
    ctx.req = { uri: '/response', options: { query: { a: 'a' }, prefix: '/api' } };
    await fn(ctx, next);
    expect(ctx.req.uri).toBe('http://localhost/api/response?a=a');

    ctx.req = {
      uri: 'https://google.com/response',
      options: { query: { a: 'a' }, prefix: '/api' },
    };
    await fn(ctx, next);
    expect(ctx.req.uri).toBe('https://google.com/api/response?a=a');

    ctx.req = { uri: '/response?b=b', options: { query: { a: 'a' }, suffix: '.json' } };
    await fn(ctx, next);
    expect(ctx.req.uri).toBe('http://localhost/response.json?b=b&a=a');

    ctx.req = {
      uri: '/response?b=b',
      options: { query: { a: 'a' }, prefix: 'https://google.com/api', suffix: '.json' },
    };
    await fn(ctx, next);
    expect(ctx.req.uri).toBe('https://google.com/api/response.json?b=b&a=a');
  });
});
