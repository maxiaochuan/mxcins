import isString from '../src/isString';

describe('is string', () => {
  it('number', () => {
    expect(isString(100)).toBe(false);
  });
  it('string', () => {
    expect(isString('1')).toBe(true);
    expect(isString('')).toBe(true);
  });
  it('object', () => {
    expect(isString({})).toBe(false);
  });
  it('function', () => {
    expect(isString(() => 1)).toBe(false);
  });
  it('others', () => {
    expect(isString(null)).toBe(false);
    expect(isString(undefined)).toBe(false);
    expect(isString(NaN)).toBe(false);
  });
});
