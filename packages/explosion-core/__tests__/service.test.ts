import { Service } from '../src';

describe('service', () => {
  test('constructor cwd', () => {
    const service = new Service({ cwd: '/asdf' });
    expect(service.paths.cwd).toBe('/asdf');
  });
  test('constructor env', () => {
    expect(new Service({ cwd: '/asdf' }).env).toBe('test');
    expect(new Service({ cwd: '/asdf', env: 'production' }).env).toBe('production');
  });
});
