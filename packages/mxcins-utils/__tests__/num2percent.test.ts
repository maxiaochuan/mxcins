import { num2percent } from '../src';

describe('debug', () => {
  test('success', () => {
    expect(num2percent(1)).toBe('100.00%');
    expect(num2percent(1, 3)).toBe('100.000%');
    expect(num2percent('1', 3)).toBe('100.000%');
    expect(num2percent('0.5', 3)).toBe('50.000%');
    expect(num2percent('0.01')).toBe('1.00%');
    expect(num2percent('0.0001')).toBe('0.01%');
    expect(num2percent('0.00001')).toBe('0.00%');
    expect(num2percent('0.00009')).toBe('0.01%');
  });

  test('error', () => {
    expect(() => num2percent('abc')).toThrowError(/argument is invalid/);
  });
});
