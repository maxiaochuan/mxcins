import * as createServer from 'create-test-server';
import request, { create, IRequestOptions } from '../src/index';
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
    server.get('/test/timeout', (req: any, res: any) => {
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
      resp = await request(prefix('/test/timeout'), {
        timeout: 600,
        getResponse: true,
      });
    } catch (error) {
      expect(error.name).toBe('RequestError');
    }
  });

  it('request type', async () => {
    server.post('/test/requestType', (req, res) => {
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

    const resp4 = await request<string>(prefix('/test/requestType'), {
      method: 'post',
      data: 'hehe',
      requestType: 'others' as any,
    });
  });

  it('response type', async () => {
    server.post('/test/responseType', (req: any, res: any) => {
      send(req.body, res);
    });

    // 默认 json
    const resp1 = await request(prefix('/test/responseType'), {
      method: 'post',
      data: { a: 'a' },
    });

    expect(resp1).toEqual({ a: 'a' });

    const resp2 = await request(prefix('/test/responseType'), {
      method: 'post',
      responseType: 'json',
      data: { a: 'a2' },
    });

    expect(resp2).toEqual({ a: 'a2' });

    const resp3 = await request(prefix('/test/responseType'), {
      method: 'post',
      responseType: 'text',
      data: { a: 'a3' },
    });

    expect(resp3).toEqual({ a: 'a3' });

    try {
      const resp4 = await request(prefix('/test/responseType'), {
        method: 'post',
        responseType: 'haha' as any,
      });
    } catch (error) {
      expect(error.name).toBe('ResponseError');
    }
  });

  it('create', async () => {
    server.post('/test/create', (req, res) => {
      send(req.body, res);
    });

    const instance = create();

    const resp1 = await instance(prefix('/test/create'), {
      method: 'post',
      data: 'x',
    });

    expect(resp1).toBe('x');
  });

  it('params fix compile', async () => {
    server.get('/test/params', (req, res) => {
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

    console.log(prefix('/test/:type'));
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
    server.get('/test/expection', (req, res) => {
      res.setHeader('access-control-allow-origin', '*');
      res.status(401);
      res.send('a');
    });

    try {
      const resp1 = await request(prefix('/test/expection'), { params: { a: 1 } });
    } catch (error) {
      expect(error.name).toBe('ResponseError');
      expect(error.response.status).toBe(401);
    }

    const errorHandler = (error: ResponseError) => {
      return 'name';
    };
    const resp2 = await request(prefix('/test/expection'), { errorHandler });

    expect(resp2).toBe('name');
  });

  it('test interceptors', async () => {
    server.get('/test/interceptors', (req, res) => {
      send(req.query, res);
    });

    request.interceptors.request.use((uri, options) => {
      options.params = { a: 'inter' };
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
