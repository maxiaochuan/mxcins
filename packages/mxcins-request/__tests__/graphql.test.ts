/* eslint-disable jest/no-try-expect */
import createServer from 'create-test-server';
import request from '../src';

type ANY = any;

const send = (data: ANY, res: ANY) => {
  res.setHeader('access-control-allow-origin', '*');
  res.send(data);
};

let prefix = (_: string) => '';

describe('test graphql', () => {
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

  it('query', async () => {
    server.post('*', (_: ANY, res: ANY) => {
      if (_.url.includes('errors')) {
        return send({ errors: [] }, res);
      }
      return send({ data: [] }, res);
    });

    const resp = await request.query(prefix('/graphql'), 'query { users { name } }', {});

    expect(resp).toEqual([]);

    await expect(() =>
      request.query(prefix('/graphql/errors'), 'query { users { name } }', {}),
    ).rejects.toThrowError();
  });
});
