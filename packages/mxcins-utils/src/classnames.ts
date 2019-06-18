import { isObject, isString } from '@mxcins/lodash';
type Args = Array<string | string[] | { [name: string]: boolean } | undefined>;

export default function classnames(...args: Args): string {
  const classes: string[] = [];

  args.forEach(input => {
    if (Array.isArray(input)) {
      classes.push(classnames.apply(null, input));
    } else if (isObject(input)) {
      const inner = classnames.apply(null, Object.keys(input).filter(k => input[k]));
      if (inner) {
        classes.push(inner);
      }
    } else if (isString(input)) {
      classes.push(input);
    }
  });

  return classes.join(' ');
}
