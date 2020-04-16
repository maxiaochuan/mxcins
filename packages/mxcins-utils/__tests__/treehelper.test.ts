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

    expect(helper.nodes['0'].children[0]).toBe(helper.nodes['1']);
    expect(helper.nodes['1'].children[0]).toBe(helper.nodes['2']);

    expect(helper.nodes['0'].proletariats.length).toBe(1);
    expect(helper.nodes['0'].proletariats[0]).toBe(helper.nodes['2']);
    expect(helper.nodes['1'].proletariats[0]).toBe(helper.nodes['2']);
    expect(helper.nodes['2'].proletariats.length).toBe(0);
  });

  it('guess', () => {
    const data = [
      {
        id: '0',
        name: 'n0',
        children: [{ id: '1', name: 'n1', children: [{ id: '2', name: 'n2' }] }],
      },
    ];
    const helper = new TreeHelper(data);
    expect(helper.opts.mode).toBe('children');

    const data2 = [
      { id: '0', parent: null, name: 'n0' },
      { id: '1', parent: { id: '0' }, name: 'n1' },
      { id: '2', parent: { id: '1' }, name: 'n2' },
    ];
    const helper2 = new TreeHelper(data2);
    expect(helper2.opts.mode).toBe('parent');
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

    expect(helper.nodes['0'].children[0]).toBe(helper.nodes['1']);
    expect(helper.nodes['1'].children[0]).toBe(helper.nodes['2']);

    expect(helper.nodes['0'].proletariats.length).toBe(1);
    expect(helper.nodes['0'].proletariats[0]).toBe(helper.nodes['2']);
    expect(helper.nodes['1'].proletariats[0]).toBe(helper.nodes['2']);
    expect(helper.nodes['2'].proletariats.length).toBe(0);
  });
});
