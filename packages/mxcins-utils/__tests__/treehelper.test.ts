import TreeHelper from '../src/helpers/Tree';

describe('tree helper', () => {
  it('use parent', () => {
    const data = [
      { id: '0', parent: null, name: 'n0' },
      { id: '1', parent: { id: '0' }, name: 'n1' },
      { id: '2', parent: { id: '1' }, name: 'n2' },
    ];
    const helper = new TreeHelper(data);
    expect(helper.roots.length).toBe(1);
    expect(helper.roots[0].id).toBe('0');

    expect(helper.nodes['0'].ancestors).toEqual([]);
    expect(helper.nodes['1'].ancestors).toEqual([helper.nodes['0']]);
    expect(helper.nodes['2'].ancestors).toEqual([helper.nodes['0'], helper.nodes['1']]);
  });

  it('use children', () => {
    const data = [
      {
        id: '0',
        name: 'n0',
        children: [{ id: '1', name: 'n1', children: [{ id: '2', name: 'n2' }] }],
      },
    ];

    const helper = new TreeHelper(data, { mode: 'children' });
    expect(helper.roots.length).toBe(1);
    expect(helper.roots[0].id).toBe('0');

    expect(helper.nodes['0'].ancestors).toEqual([]);
    expect(helper.nodes['1'].ancestors).toEqual([helper.nodes['0']]);
    expect(helper.nodes['2'].ancestors).toEqual([helper.nodes['0'], helper.nodes['1']]);
  });
});
