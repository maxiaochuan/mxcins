import TreeHelper from '../src/helpers/Tree';

const d1 = [
  { id: '0', parent: null, name: 'n0' },
  { id: '1', parent: { id: '0' }, name: 'n1' },
  { id: '2', parent: { id: '1' }, name: 'n2' },
];

const d2 = [
  { id: '0', name: 'n0', children: [{ id: '1', name: 'n1', children: [{ id: '2', name: 'n2' }] }] },
];

describe('tree helper', () => {
  it('mode', () => {
    const h1 = new TreeHelper([...d1]);
    expect(h1.roots.length).toBe(1);
    expect(h1.roots[0].id).toBe('0');

    const h2 = new TreeHelper([...d2]);
    expect(h2.roots.length).toBe(1);
    expect(h2.roots[0].id).toBe('0');
  });

  it('node parent', () => {
    const helper = new TreeHelper([...d1]);
    expect(helper.nodes['1'].parent).toBe(helper.nodes['0']);
    expect(helper.nodes['2'].parent).toBe(helper.nodes['1']);
  });

  it('node children', () => {
    const helper = new TreeHelper([...d1]);
    expect(helper.nodes['0'].children?.length).toBe(1);
    expect(helper.nodes['1'].children?.length).toBe(1);
    expect(helper.nodes['2'].children).toBe(undefined);
  });

  it('node ancestors', () => {
    const helper = new TreeHelper([...d1]);
    expect(helper.nodes['0'].ancestors).toBe(undefined);
    expect(helper.nodes['1'].ancestors).toBe(undefined);
    expect(helper.nodes['2'].ancestors).toBe(undefined);
  });

  it('node proletariats', () => {
    const helper = new TreeHelper([...d1]);
    expect(helper.nodes['0'].proletariats).toBe(undefined);
    expect(helper.nodes['1'].proletariats).toBe(undefined);
    expect(helper.nodes['2'].proletariats).toBe(undefined);
  });

  it('opts ancestors true', () => {
    const helper = new TreeHelper([...d1], { ancestors: true });
    expect(helper.nodes['0'].ancestors).toBe(undefined);
    expect(helper.nodes['1'].ancestors?.length).toBe(1);
    expect(helper.nodes['1'].ancestors?.[0]).toBe(helper.nodes['0']);
    expect(helper.nodes['2'].ancestors?.length).toBe(2);
    expect(helper.nodes['2'].ancestors?.[0]).toBe(helper.nodes['0']);
    expect(helper.nodes['2'].ancestors?.[1]).toBe(helper.nodes['1']);
  });

  it('opts proletariats false', () => {
    const helper = new TreeHelper([...d1], { proletariats: true });
    expect(helper.nodes['0'].proletariats?.length).toBe(1);
    expect(helper.nodes['0'].proletariats?.[0]).toBe(helper.nodes['2']);
    expect(helper.nodes['1'].proletariats?.length).toBe(1);
    expect(helper.nodes['1'].proletariats?.[0]).toBe(helper.nodes['2']);
    expect(helper.nodes['2'].proletariats).toBe(undefined);
  });
});
