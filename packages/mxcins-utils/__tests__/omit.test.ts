import omit from '../src/omit';

describe('omit', () => {
  it('default', () => {
    expect(omit({ a: 'a', b: 'b' }, ['a'])).toEqual({ b: 'b' });
  });
});
