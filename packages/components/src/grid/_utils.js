export const space2standard = input => {
  if (typeof input === 'undefined' || input === null) {
    return input;
  }

  if (typeof input === 'number') {
    return [input, 0];
  }

  if (typeof input === 'object') {
    return [input, {}];
  }

  if (Array.isArray(input)) {
    return input.map(row => space2standard(row));
  }

  throw new Error('space 2 standard error.');
};
