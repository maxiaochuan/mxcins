const makeBreakpointNumberHash = hash => {
  if (hash === undefined || hash === null) {
    return {};
  } else if (typeof hash === 'boolean') {
    return {};
  } else if (typeof hash === 'number') {
    return { xs: hash };
  } else if (typeof hash === 'object') {
    return hash;
  }
};

const makeBreakpointNumberHashArray = arr => {
  const result = Array.isArray(arr)
  ? [makeBreakpointNumberHash(arr[0]), makeBreakpointNumberHash(arr[1])]
  : [makeBreakpointNumberHash(arr), makeBreakpointNumberHash()]
  return result;
}

const getCurrentBreakpointValue = ([h1, h2], breakpoints) => {
  const k1 = breakpoints.find(breakpoint => !!h1[breakpoint]);
  const k2 = breakpoints.find(breakpoint => !!h2[breakpoint]);
  return [k1 && h1[k1] || 0, k2 && h2[k2] || 0]
}

export {
  makeBreakpointNumberHash,
  makeBreakpointNumberHashArray,
  getCurrentBreakpointValue,
}