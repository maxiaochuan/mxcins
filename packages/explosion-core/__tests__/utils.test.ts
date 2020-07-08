import { join } from 'path';
import { loadDotEnv } from '../src/utils';

describe('service', () => {
  test('load env', () => {
    loadDotEnv(join(__dirname, 'env'));
    expect(process.env.TESTCASE).toBe('true');
  });
});
