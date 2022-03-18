const isBreakpointRecord = input => {
  if (Array.isArray(input)) {
    return input.some(row => isBreakpointRecord(row))
  }

  if (typeof input === 'undefined' || input === null) {
    return false;
  }

  return typeof input === 'object';
}

const anyToBreakpointRecord = input => {
  if (typeof input === 'undefined' || input === null) {
    return { xs: 0 };
  }
  if (typeof input === 'number') {
    return { xs: input };
  }

  if (typeof input === 'object') {
    return input;
  }
}

const anyToTwoBreakpointRecord = input => {
  if (Array.isArray(input)) {
    return [anyToBreakpointRecord(input[0]), anyToBreakpointRecord(input[1])];
  }
  return [anyToBreakpointRecord(input), anyToBreakpointRecord(undefined)]
}

const makeSpacingByBreakpoints = (spacing, screens) => {
  const [h1, h2] = anyToTwoBreakpointRecord(spacing);
  const k1 = screens.find(breakpoint => !!h1[breakpoint]);
  const k2 = screens.find(breakpoint => !!h2[breakpoint]);
  return [k1 && h1[k1] || 0, k2 && h2[k2] || 0]
}

export { anyToBreakpointRecord, anyToTwoBreakpointRecord, isBreakpointRecord, makeSpacingByBreakpoints }