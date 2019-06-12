import parseJson from '../src/parseJson';

describe('parseJson', () => {
  it('error', () => {
    expect(() => parseJson('{"a":1,}')).toThrowError(/while/);
    expect(() => parseJson('')).toThrowError(/while/);
  });
  it('normal', () => {
    expect(parseJson('{"a":1}')).toEqual({ a: 1 });
    expect(parseJson('[1,2]')).toEqual([1, 2]);
  });
});
