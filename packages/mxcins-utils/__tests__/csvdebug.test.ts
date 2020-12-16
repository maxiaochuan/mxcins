import { join } from 'path';
import { readFileSync } from 'fs';
import { decode } from '../src/csv';

describe('debug', () => {
  it('one column', () => {
    const string = readFileSync(join(__dirname, '../examples/test_one.csv'), 'utf-8');
    expect(decode(string)).toStrictEqual([]);
  });
});
