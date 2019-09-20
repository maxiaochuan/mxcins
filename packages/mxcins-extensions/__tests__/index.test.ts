import '../src';

describe('extensions', () => {
  it('camelcase', () => {
    const str = 'component_class';
    expect(str.camelcase).toBe('componentClass');
  })
  it('snakecase', () => {
    const str = 'component_class';
    expect(str.snakecase).toBe('component_class');
  })

  it('kebabcase', () => {
    const str = 'component_class';
    expect(str.kebabcase).toBe('component-class');
  })
});
