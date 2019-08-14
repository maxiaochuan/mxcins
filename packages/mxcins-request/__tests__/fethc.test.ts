import createServer from 'create-test-server';
import { IRequestContext } from '../src/interface';
import { fetchMiddleware } from '../src/middlewares';
import { MapCache } from '../src/utils';

const send = (data: any, res: any) => {
  res.setHeader('access-control-allow-origin', '*');
  res.send(data);
};

describe('middlewares', () => {
  let server: any;
  beforeAll(async () => {
    server = await createServer();
  });
  afterAll(async () => {
    if (server) {
      await server.close();
    }
  });

  it('fetchMiddleware response', async () => {
    server.get('/response', (_: any, res: any) => {
      send('ok', res);
    });
    const ctx: IRequestContext = {
      req: { uri: `${server.url}/response` },
      res: null,
      cache: new MapCache({}),
    };
    const next = () => Promise.resolve();
    await fetchMiddleware(ctx, next);

    if (ctx.res) {
      const text = await ctx.res.text();
      expect(text).toBe('ok');
    }
  });

  it('fetchMiddleware timeout', async () => {
    server.get('/timeout', (_: any, res: any) => {
      setTimeout(() => send('ok', res), 2000);
    });
    const ctx: IRequestContext = {
      req: { uri: `${server.url}/timeout`, options: { timeout: 1000 } },
      res: null,
      cache: new MapCache({}),
    };
    const next = () => Promise.resolve();
    try {
      await fetchMiddleware(ctx, next);
    } catch (error) {
      expect(error.name).toBe('RequestError');
    }
  });

  it('fetchMiddleware use cache', async () => {
    server.get('/cache', (_: any, res: any) => {
      send('cache', res);
    });
    const ctx: IRequestContext = {
      req: { uri: `${server.url}/cache`, options: { timeout: 1000, useCache: true } },
      res: null,
      cache: new MapCache({}),
    };
    const next = () => Promise.resolve();
    await fetchMiddleware(ctx, next);
    await fetchMiddleware(ctx, next);
    if (ctx.res) {
      expect(ctx.res.useCache).toBe(true);
    }
  });
});
