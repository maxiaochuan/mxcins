import { join } from 'path';
import { readFileSync } from 'fs';
import { decode } from '../src/csv';

describe('debug', () => {
  // it('empty cell', () => {
  //   const string = readFileSync(join(__dirname, '../examples/20191211.csv'), 'utf-8');
  //   expect(decode(string)).toStrictEqual([]);
  // })
  it('end with no delimeter', () => {
    const string = readFileSync(join(__dirname, '../examples/test_risk.csv'), 'utf-8');
    expect(decode(string)).toStrictEqual([]);
  });
});
