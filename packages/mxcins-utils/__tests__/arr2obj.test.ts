import arr2obj from '../src/arr2obj';

describe('arr2obj', () => {
  it('input arr', () => {
    const obj = { id: 1, name: 'xiaochuan' };
    const input = [obj];
    expect(arr2obj(input)).toEqual({ 1: { id: 1, name: 'xiaochuan' } });
    expect(arr2obj(input)['1']).toBe(obj);

    expect(arr2obj(input, { clone: true })['1']).not.toBe(obj);

    expect(arr2obj(input, { key: 'name' })).toEqual({ xiaochuan: { id: 1, name: 'xiaochuan' } });
  });
  it('input not arr', () => {
    const input: any = 1;
    expect(() => arr2obj(input)).toThrow(/MUST be array/);
  });
});
