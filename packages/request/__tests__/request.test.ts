/* eslint-disable jest/no-try-expect */
import createServer from 'create-test-server';
import request, { extend, ResponseError } from '../src';

type ANY = any;

const send = (data: ANY, res: ANY) => {
  res.setHeader('access-control-allow-origin', '*');
  res.send(data);
};

let prefix = (_: string) => '';

describe('test request', () => {
  let server: ANY;
  beforeAll(async () => {
    server = await createServer();
    prefix = (api: string) => `${server.url}${api}`;
  });
  afterAll(async () => {
    if (server) {
      await server.close();
    }
  });

  it('timeout', async () => {
    server.get('/test/timeout', (_: ANY, res: ANY) => {
      setTimeout(() => {
        send('ok', res);
      }, 1000);
    });

    const resp = await request<string>(prefix('/test/timeout'), {
      timeout: 1200,
      getResponse: true,
    });

    expect(resp.response.ok).toBe(true);

    await expect(() =>
      request<string>(prefix('/test/timeout'), {
        timeout: 600,
        getResponse: true,
      }),
    ).rejects.toThrowError();
  });

  it('request type', async () => {
    server.post('/test/requestType', (req: ANY, res: ANY) => {
      send(req.body, res);
    });

    const data = { a: 'a' };
    const resp = await request<typeof data>(prefix('/test/requestType'), {
      method: 'post',
      requestType: 'form',
      data,
    });
    expect(resp.a).toBe('a');

    const resp2 = await request<typeof data>(prefix('/test/requestType'), {
      method: 'post',
      requestType: 'json',
      data: { a: 'a2' },
    });
    expect(resp2.a).toBe('a2');

    const resp3 = await request<string>(prefix('/test/requestType'), {
      method: 'post',
      data: 'haha',
    });
    expect(resp3).toBe('haha');
  });

  it('response type', async () => {
    server.post('/test/responseType', (req: ANY, res: ANY) => {
      send(req.body, res);
    });

    // 默认 json
    const d1 = { a: 'a' };
    const resp1 = await request<typeof d1>(prefix('/test/responseType'), {
      method: 'post',
      data: d1,
    });

    expect(resp1).toEqual({ a: 'a' });

    const d2 = { a: 'a2' };
    const resp2 = await request<typeof d2>(prefix('/test/responseType'), {
      method: 'post',
      responseType: 'json',
      data: d2,
    });

    expect(resp2).toEqual({ a: 'a2' });

    const d3 = { a: 'a3' };
    const resp3 = await request<typeof d3>(prefix('/test/responseType'), {
      method: 'post',
      responseType: 'text',
      data: d3,
    });

    expect(resp3).toEqual({ a: 'a3' });
  });

  it('get response', async () => {
    server.post('/test/create', (req: ANY, res: ANY) => {
      send(req.body, res);
    });

    const resp1 = await request<string>(prefix('/test/create'), { method: 'post', data: 'x' });
    expect(resp1).toBe('x');
    const resp2 = await request<string>(prefix('/test/create'), {
      method: 'post',
      getResponse: true,
      data: 'x',
    });
    expect(resp2.response.status).toBe(200);
    const resp3 = await request<string>(prefix('/test/create'), {
      method: 'post',
      getResponse: false,
      data: 'x',
    });
    expect(resp3).toBe('x');

    const instance1 = extend();
    const resp4 = await instance1<string>(prefix('/test/create'), { method: 'post', data: 'x' });
    expect(resp4).toBe('x');
    const resp5 = await instance1<string>(prefix('/test/create'), {
      method: 'post',
      getResponse: true,
      data: 'x',
    });
    expect(resp5.response.status).toBe(200);
    const resp6 = await instance1<string>(prefix('/test/create'), {
      method: 'post',
      getResponse: false,
      data: 'x',
    });
    expect(resp6).toBe('x');

    const instance2 = extend();
    const resp8 = await instance2<string>(prefix('/test/create'), {
      method: 'post',
      getResponse: true,
      data: 'x',
    });
    expect(resp8.response.status).toBe(200);
    const resp9 = await instance2<string>(prefix('/test/create'), {
      method: 'post',
      getResponse: false,
      data: 'x',
    });
    expect(resp9).toBe('x');
  });

  it('params fix compile', async () => {
    server.get('/test/params', (req: ANY, res: ANY) => {
      send(req.query, res);
    });

    const resp1 = await request(prefix('/test/params'), {
      query: {
        a: 'a',
      },
    });
    expect(resp1).toEqual({ a: 'a' });

    const resp4 = await request(prefix('/test/params?b=b'), {
      query: {
        a: 'a',
      },
    });
    expect(resp4).toEqual({ a: 'a', b: 'b' });

    // const resp2 = await request(prefix('/test/params'), {
    //   prefix: server.url,
    //   queryParams: {
    //     a: 'a',
    //   },
    // });
    // expect(resp2).toEqual({ a: 'a' });

    // const resp3 = await request(prefix('/test'), {
    //   suffix: '/params',
    //   queryParams: {
    //     a: 'a',
    //   },
    // });
    // expect(resp3).toEqual({ a: 'a' });

    const resp5 = await request(prefix('/test/:type'), {
      params: {
        type: 'params',
      },
      query: {
        a: 'a',
      },
    });
    expect(resp5).toEqual({ a: 'a' });
  });

  it('test exception', async () => {
    server.get('/test/expection', (_: ANY, res: ANY) => {
      res.setHeader('access-control-allow-origin', '*');
      res.status(401);
      res.send('a');
    });

    try {
      await request(prefix('/test/expection'), { params: { a: 1 } });
    } catch (error_) {
      const error = error_ as ResponseError;
      // eslint-disable-next-line jest/no-conditional-expect
      expect(error.name).toBe('ResponseError');
      // eslint-disable-next-line jest/no-conditional-expect
      expect(error.response.status).toBe(401);
    }

    // eslint-disable-next-line unicorn/consistent-function-scoping
    const onError = () => 'name';
    const resp2 = await request(prefix('/test/expection'), { onError });

    expect(resp2).toBe('name');
  });

  it('test cache', async () => {
    server.get('/test/cache', (_: ANY, res: ANY) => {
      setTimeout(() => {
        send('cache', res);
      }, 2000);
    });

    const instance = extend({ useCache: true });
    const resp = await instance(prefix('/test/cache'));

    expect(resp).toBe('cache');
    const resp2 = await instance(prefix('/test/cache'), { timeout: 100 });
    expect(resp2).toBe('cache');
  });

  it('test interceptors', async () => {
    server.get('/test/interceptors', (req: ANY, res: ANY) => {
      send(req.query, res);
    });

    request.use(async (ctx, next) => {
      const { options = {} } = ctx.req;
      ctx.req.options = { ...options, query: { ...options.query, a: 'inter' } };
      return next();
    });
    const resp1 = await request(prefix('/test/interceptors'));
    expect(resp1).toEqual({ a: 'inter' });

    request.use(async (ctx, next) => {
      await next();
      ctx.res = 'haha';
    });
    const resp2 = await request(prefix('/test/interceptors'));
    expect(resp2).toBe('haha');
  });
});
