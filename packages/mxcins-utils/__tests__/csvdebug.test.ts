import { join } from 'path';
import { readFileSync } from 'fs';
import { decode } from '../src/csv';

describe('debug', () => {
  // it('empty cell', () => {
  //   const string = readFileSync(join(__dirname, '../examples/20191211.csv'), 'utf-8');
  //   expect(decode(string)).toStrictEqual([]);
  // })
  // it('end with no delimeter', () => {
  //   const string = readFileSync(join(__dirname, '../examples/test_risk.csv'), 'utf-8');
  //   expect(decode(string)).toStrictEqual([{ a: '4', b: `5\na`, c: '6' }]);
  // });

  // it('last', () => {
  //   const string = readFileSync(join(__dirname, '../examples/test_last.csv'), 'utf-8');
  //   expect(decode(string)).toStrictEqual([
  //     {
  //       collection: 'C1-Ⅲ工区-8段',
  //       component_class_name: '挖一般土方构件',
  //       group_name: '三期Ⅱ标交通中心开挖C1区四层土全段-挖一般土方构件组',
  //       name: '↵C1逆作四层挖一般土方构件_虚拟构件28',
  //       section_name: '三期Ⅱ标交通中心开挖C1区四层土全段',
  //     },
  //   ]);
  // });
  it('one column', () => {
    const string = readFileSync(join(__dirname, '../examples/test_one.csv'), 'utf-8');
    expect(decode(string)).toStrictEqual([]);
  });
});
