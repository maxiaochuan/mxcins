import pluralize from '../src';

describe('pluralize', () => {
  it('normal', () => {
    expect(pluralize.singular('activities')).toBe('activity');
    expect(pluralize.plural('activity')).toBe('activities');
  });
});
