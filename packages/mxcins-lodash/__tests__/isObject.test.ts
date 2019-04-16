import isObject from '../src/isObject';

describe('is string', () => {
  it('number', () => {
    expect(isObject(100)).toBe(false);
  });
  it('string', () => {
    expect(isObject('1')).toBe(false);
    expect(isObject('')).toBe(false);
  });
  it('array', () => {
    expect(isObject([])).toBe(true);
  });
  it('object', () => {
    expect(isObject({})).toBe(true);
  });
  it('function', () => {
    expect(isObject(() => 1)).toBe(true);
  });
  it('others', () => {
    expect(isObject(null)).toBe(false);
    expect(isObject(undefined)).toBe(false);
    expect(isObject(NaN)).toBe(false);
  });
});
