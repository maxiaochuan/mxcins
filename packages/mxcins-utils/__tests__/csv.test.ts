import { encode, decode } from '../src/csv';

describe('csv decode', () => {
  test('unsafe', () => {
    expect(decode('a\r\n')).toEqual([]);
    expect(decode('a\r\n1\r\n')).toEqual([{ a: '1' }]);
    expect(decode('a,b\r\n1,2\r\n')).toEqual([{ a: '1', b: '2' }]);
    expect(decode('a,b\r\n1,2')).toEqual([{ a: '1', b: '2' }]);
    expect(decode('a,b\n1,2\n')).toEqual([{ a: '1', b: '2' }]);
    expect(decode('a,b\n1,2')).toEqual([{ a: '1', b: '2' }]);
    expect(decode('a,b\r1,2\r')).toEqual([{ a: '1', b: '2' }]);
    expect(decode('a,b\r1,2')).toEqual([{ a: '1', b: '2' }]);
  });

  test('fields', () => {
    expect(decode('a\r\n', { fields: true })).toEqual({ data: [], fields: ['a'] });
  });
});

describe('csv encode', () => {
  test('object array', () => {
    const input = [
      //
      { id: 'i1', name: 'n1' },
    ];
    expect(encode(input, { fields: ['id'] })).toBe('id\r\ni1\r\n');
    expect(encode(input, { fields: ['id', 'name'] })).toBe('id,name\r\ni1,n1\r\n');
    expect(encode(input, { fields: { id: 'ID' } })).toBe('ID\r\ni1\r\n');
    expect(encode(input, { fields: { id: 'ID', name: 'NAME' } })).toBe('ID,NAME\r\ni1,n1\r\n');
    expect(encode(input, { fields: { name: 'NAME', id: 'ID' } })).toBe('NAME,ID\r\nn1,i1\r\n');
  });

  test('empty array', () => {
    const input: any[] = [];
    expect(encode(input, { fields: ['id'] })).toBe('id\r\n');
  });
});
