import * as createServer from 'create-test-server';
import request, { create } from '../src/index';

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

    let resp = await request(prefix('/test/timeout'), {
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

  afterEach(() => {
    server.close();
  });
});
