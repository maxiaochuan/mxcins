/* eslint-disable unicorn/no-null, import/no-extraneous-dependencies */
import { cloneDeep } from 'lodash';
import { IRequestContext } from '../src/interface';
import { graphql as middleware } from '../src/middlewares';
import MapCache from '../src/MapCache';

const DEFAULT_CTX: IRequestContext = {
  req: { uri: `/response` },
  res: null,
  cache: new MapCache({}),
};
const next = () => Promise.resolve();

describe('graphql', () => {
  it('data transform', async () => {
    const ctx = cloneDeep(DEFAULT_CTX);
    ctx.req.options = { data: 'query {}' };
    await middleware(ctx, next);
    expect(ctx.req.options.data).toEqual({
      query: 'query {}',
      variables: undefined,
    });
  });

  it('method should be post', async () => {
    const ctx = cloneDeep(DEFAULT_CTX);
    ctx.req.options = { data: 'query {}' };
    await middleware(ctx, next);
    expect(ctx.req.options.method).toBe('post');
  });

  it('data transform with variables', async () => {
    const ctx = cloneDeep(DEFAULT_CTX);
    ctx.req.options = { data: 'query {}', params: { id: '1' } };
    await middleware(ctx, next);
    expect(ctx.req.options.data).toEqual({
      query: 'query {}',
      variables: { id: '1' },
    });
  });
});
