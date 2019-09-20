import { readFileSync } from 'fs';
import { join } from 'path';
import { encode, decode } from '../src/csv';

describe('csv decode', () => {
  it('normal', () => {
    const text = readFileSync(join(__dirname, '../examples/test.csv'), 'utf-8');
    expect(decode(text, { newline: '\n' })).toEqual([
      { task_name: '3垫层浇筑', plan_start_date: '2019-8-7', plan_finish_date: '2019-8-8' },
    ]);
  });

  it('auto newline', () => {
    expect(decode('a,b\r\n1,2\r\n')).toEqual([{ a: '1', b: '2' }]);
    expect(decode('a,b\r\n1,2')).toEqual([{ a: '1', b: '2' }]);
    expect(decode('a,b\n1,2\n')).toEqual([{ a: '1', b: '2' }]);
    expect(decode('a,b\n1,2')).toEqual([{ a: '1', b: '2' }]);
    expect(decode('a,b\r1,2\r')).toEqual([{ a: '1', b: '2' }]);
    expect(decode('a,b\r1,2')).toEqual([{ a: '1', b: '2' }]);
  });
});

describe('csv encode', () => {
  it('normal', () => {
    expect(encode([{ a: 1, b: 2 }], { fields: ['a', 'b'] })).toBe('a,b\r\n1,2\r\n');
  });

  it('fields', () => {
    expect(encode([{ a: 1, b: 2 }], { fields: { a: 'aa', b: 'bb' } })).toBe('aa,bb\r\n1,2\r\n');
  });
});
