import { isNaN, isNumber, floor } from 'lodash';

const num2percent = (input: unknown, digits = 2): string => {
  const num = isNumber(input) ? input : Number(input);
  if (isNaN(num)) {
    throw new TypeError('num2percent argument is invalid.');
  }

  return `${floor(num * 100, digits)}%`;
};

export default num2percent;
