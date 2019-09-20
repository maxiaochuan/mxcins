import { isObject } from 'lodash-es';

export interface IMapObjectOpts {
  deep?: boolean;
  target?: Record<string, any>;
}

export type Fn = (key: string, value: unknown, object: any) => [string, unknown];

const mapObject = (object: Record<string, any>, fn: Fn, opts: IMapObjectOpts = {}) => {
  const options = {
    deep: false,
    target: {},
    ...opts,
  };

  const { target, deep } = options;
  delete options.target;

  const mapArray = (array: any[]): any[] =>
    array.map(v => (isObject(v) ? mapObject(v, fn, options) : v));
  if (Array.isArray(object)) {
    return mapArray(object);
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(object)) {
    const [newKey, newValue] = fn(key, value, object);
    target[newKey] =
      // eslint-disable-next-line no-nested-ternary
      deep && isObject(newValue)
        ? Array.isArray(newValue)
          ? mapArray(newValue)
          : mapObject(newValue, fn, options)
        : newValue;
  }

  return target;
};

export default mapObject;
