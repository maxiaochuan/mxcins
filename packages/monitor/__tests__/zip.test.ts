import { describe, expect, it } from 'vitest';
import { unzip, zip } from '../src/common';

describe('zip', () => {
  it('string', () => {
    const str = 'abcde';
    const result = unzip(zip(str));
    expect(result).toEqual(str);
  });
  it('object', () => {
    const str = { a: 'a' };
    const result = zip(str);
    expect(unzip(result)).toEqual(str);
  });
});
