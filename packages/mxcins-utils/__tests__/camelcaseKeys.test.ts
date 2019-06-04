import camelcaseKeys from '../src/camelcaseKeys';

describe('camelcaseKeys', () => {
  it('object', () => {
    expect(camelcaseKeys({ a_b: 'a' })).toEqual({ aB: 'a' });
    expect(camelcaseKeys({ section_id: 100 })).toEqual({ sectionId: 100 });
    expect(camelcaseKeys({ sections: { component_id: 100 } })).toEqual({
      sections: { component_id: 100 },
    });
  });
  it('array', () => {
    expect(camelcaseKeys([{ a_b: 'a' }])).toEqual([{ aB: 'a' }]);
    expect(camelcaseKeys([{ section_id: 100 }])).toEqual([{ sectionId: 100 }]);
    expect(camelcaseKeys([{ sections: { component_id: 100 } }])).toEqual([
      { sections: { component_id: 100 } },
    ]);
  });
  it('deep', () => {
    expect(camelcaseKeys([{ sections: { component_id: 100 } }], { deep: true })).toEqual([
      { sections: { componentId: 100 } },
    ]);
  });
  it('exclude', () => {
    expect(
      camelcaseKeys([{ sections: { component_id: 100 } }], {
        deep: true,
        exclude: ['component_id'],
      }),
    ).toEqual([{ sections: { component_id: 100 } }]);
    expect(
      camelcaseKeys([{ sections: { component_id: 100 } }], { deep: true, exclude: [/component/] }),
    ).toEqual([{ sections: { component_id: 100 } }]);
  });
  it('others', () => {
    expect(camelcaseKeys([12] as any, { deep: true, exclude: ['component_id'] })).toEqual([12]);
    expect(camelcaseKeys(12 as any, { deep: true, exclude: ['component_id'] })).toEqual(12);
  });
});
