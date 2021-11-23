import { isObject, isString } from 'lodash';

type Args = Array<string | string[] | { [name: string]: boolean } | undefined>;

export default function classnames(...args: Args): string {
  const classes: string[] = [];

  for (const input of args) {
    if (Array.isArray(input)) {
      classes.push(classnames(...input));
    } else if (isObject(input)) {
      const inner = classnames(...Object.keys(input).filter(k => input[k]));
      if (inner) {
        classes.push(inner);
      }
    } else if (isString(input)) {
      classes.push(input);
    }
  }

  return classes.join(' ');
}
