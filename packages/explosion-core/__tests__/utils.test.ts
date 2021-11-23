import path from 'path';
import { loadDotEnv } from '../src/utils';

const { join } = path;

describe('service', () => {
  test('load env', () => {
    // eslint-disable-next-line unicorn/prefer-module
    loadDotEnv(join(__dirname, 'env'));
    expect(process.env.TESTCASE).toBe('true');
  });
});
