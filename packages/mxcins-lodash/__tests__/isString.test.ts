import isString from '../src/isString';

describe('is string', () => {
  it('number', () => {
    expect(isString(100)).toBe(false);
  });
});
