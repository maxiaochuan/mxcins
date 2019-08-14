import Core from '../src/Core';

import { fetchMiddleware } from '../src/middlewares';

describe('core', () => {
  it('constructor', () => {
    const c = new Core({});
    expect(c.onion.middlewares.length).toBe(0);

    const o = {};
    const c2 = new Core(o, [fetchMiddleware]);
    expect(c2.onion.middlewares.length).toBe(1);
  });

  it('request', async () => {
    const c = new Core({}, [fetchMiddleware]);
    const resp = await c.request('123', {});
    expect(resp).toBe(null);
  });
});
