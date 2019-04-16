import classnames from '../src/classnames';

describe('omit', () => {
  it('empty', () => {
    expect(classnames(null as any)).toBe('');
    expect(classnames(null as any, undefined as any)).toBe('');
  });
  it('object', () => {
    expect(classnames({ a: true, b: false })).toBe('a');
    expect(classnames({ a: true, b: true })).toBe('a b');
  });
  it('array', () => {
    expect(classnames(['a'])).toBe('a');
    expect(classnames({ a: true, b: true })).toBe('a b');
  });
  it('merge', () => {
    expect(classnames(['a'], { b: true }, 'c d')).toBe('a b c d');
    expect(classnames(['a'], { b: false }, 'c d')).toBe('a c d');
  });
});
