import snakecaseKeys from '../src/snakecaseKeys';

describe('snakecaseKeys', () => {
  it('object', () => {
    expect(snakecaseKeys({ 'a_b-c': 'a' })).toEqual({ a_b_c: 'a' });
    expect(snakecaseKeys({ sectionId: 100 })).toEqual({ section_id: 100 });
    expect(snakecaseKeys({ sections: { componentId: 100 } })).toEqual({
      sections: { componentId: 100 },
    });
  });
  it('array', () => {
    expect(snakecaseKeys([{ sectionId: 100 }])).toEqual([{ section_id: 100 }]);
    expect(snakecaseKeys([{ sections: { componentId: 100 } }])).toEqual([
      { sections: { componentId: 100 } },
    ]);
  });
  it('deep', () => {
    expect(snakecaseKeys([{ sections: { componentId: 100 } }], { deep: true })).toEqual([
      { sections: { component_id: 100 } },
    ]);
  });
  it('exclude', () => {
    expect(
      snakecaseKeys([{ sections: { componentId: 100 } }], {
        deep: true,
        exclude: ['componentId'],
      }),
    ).toEqual([{ sections: { componentId: 100 } }]);
    expect(
      snakecaseKeys([{ sections: { componentId: 100 } }], { deep: true, exclude: [/component/] }),
    ).toEqual([{ sections: { componentId: 100 } }]);
  });
  it('others', () => {
    expect(snakecaseKeys([12] as any, { deep: true, exclude: ['component_id'] })).toEqual([12]);
    expect(snakecaseKeys(12 as any, { deep: true, exclude: ['component_id'] })).toEqual(12);
  });
});
