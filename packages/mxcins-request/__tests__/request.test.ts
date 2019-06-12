import createServer from 'create-test-server';
import request, { factory } from '../src/index';
import { ResponseError } from '../src/utils';

const send = (data: any, res: any) => {
  res.setHeader('access-control-allow-origin', '*');
  res.send(data);
};

describe('test request', () => {
  let server: any;
  beforeEach(async () => {
    server = await createServer();
  });

  const prefix = (api: string) => `${server.url}${api}`;

  it('timeout', async () => {
    server.get('/test/timeout', (_: any, res: any) => {
      setTimeout(() => {
        send('ok', res);
      }, 1000);
    });

    let resp = await request<string>(prefix('/test/timeout'), {
      timeout: 1200,
      getResponse: true,
    });

    expect(resp.response.ok).toBe(true);

    try {
      resp = await request<string>(prefix('/test/timeout'), {
        timeout: 600,
        getResponse: true,
      });
    } catch (error) {
      expect(error.name).toBe('RequestError');
    }
  });

  it('request type', async () => {
    server.post('/test/requestType', (req: any, res: any) => {
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
    server.post('/test/responseType', (req: any, res: any) => {
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

    try {
      await request(prefix('/test/responseType'), {
        method: 'post',
        responseType: 'haha' as any,
      });
    } catch (error) {
      expect(error.name).toBe('ResponseError');
    }
  });

  it('get response', async () => {
    server.post('/test/create', (req: any, res: any) => {
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

    const instance1 = factory();
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

    const instance2 = factory({ getResponse: true });
    const resp7 = await instance2<string>(prefix('/test/create'), { method: 'post', data: 'x' });
    expect(resp7.response.status).toBe(200);
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
    server.get('/test/params', (req: any, res: any) => {
      send(req.query, res);
    });

    const resp1 = await request(prefix('/test/params'), {
      queryParams: {
        a: 'a',
      },
    });
    expect(resp1).toEqual({ a: 'a' });

    const resp4 = await request(prefix('/test/params?b=b'), {
      queryParams: {
        a: 'a',
      },
    });
    expect(resp4).toEqual({ a: 'a', b: 'b' });

    const resp2 = await request('/test/params', {
      prefix: server.url,
      queryParams: {
        a: 'a',
      },
    });
    expect(resp2).toEqual({ a: 'a' });

    const resp3 = await request(prefix('/test'), {
      suffix: '/params',
      queryParams: {
        a: 'a',
      },
    });
    expect(resp3).toEqual({ a: 'a' });

    const resp5 = await request(prefix('/test/:type'), {
      params: {
        type: 'params',
      },
      queryParams: {
        a: 'a',
      },
    });
    expect(resp5).toEqual({ a: 'a' });
  });

  it('test exception', async () => {
    server.get('/test/expection', (_: any, res: any) => {
      res.setHeader('access-control-allow-origin', '*');
      res.status(401);
      res.send('a');
    });

    try {
      await request(prefix('/test/expection'), { params: { a: 1 } });
    } catch (error) {
      expect(error.name).toBe('ResponseError');
      expect(error.response.status).toBe(401);
    }

    const errorHandler = (_: ResponseError) => {
      return 'name';
    };
    const resp2 = await request(prefix('/test/expection'), { errorHandler });

    expect(resp2).toBe('name');
  });

  it('test cache', async () => {
    server.get('/test/cache', (_: any, res: any) => {
      setTimeout(() => {
        send('cache', res);
      }, 2000);
    });

    const instance = factory({ useCache: true });
    const resp = await instance(prefix('/test/cache'));

    expect(resp).toBe('cache');
    const resp2 = await instance(prefix('/test/cache'), { timeout: 100 });
    expect(resp2).toBe('cache');
  });

  it('test interceptors', async () => {
    server.get('/test/interceptors', (req: any, res: any) => {
      send(req.query, res);
    });

    request.interceptors.request.use((uri, options) => {
      options.queryParams = { a: 'inter' };
      return { uri, options };
    });
    const resp1 = await request(prefix('/test/interceptors'));
    expect(resp1).toEqual({ a: 'inter' });

    request.interceptors.response.use(response => {
      const copy = response.clone();
      copy.text = async () => 'haha';
      return copy;
    });
    const resp2 = await request(prefix('/test/interceptors'));
    expect(resp2).toBe('haha');
  });

  afterEach(() => {
    server.close();
  });
});
