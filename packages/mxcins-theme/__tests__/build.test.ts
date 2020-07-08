import theme2vars from '../src/theme2vars';

describe('async render', () => {
  test('render', async () => {
    const json = await theme2vars({ theme: 'green' });
    expect(json.theme).toBe('green');
  });
});
