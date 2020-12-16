import { isObject } from 'lodash';

export interface MapObjectOptions {
  deep?: boolean;
  target?: Record<string, unknown>;
}

export type Fn = (
  key: string,
  value: unknown,
  object: Record<string, unknown>,
) => [string, unknown];

const mapObject = <T extends Record<string, unknown> = Record<string, unknown>>(
  object: Record<string, unknown>,
  fn: Fn,
  opts: MapObjectOptions = {},
): T => {
  const options: MapObjectOptions = {
    deep: false,
    target: {},
    ...opts,
  };

  const { target, deep } = options;
  delete options.target;

  const mapArray = (array: unknown[]): unknown =>
    array.map(v => (isObject(v) ? mapObject(v as Record<string, unknown>, fn, options) : v));
  if (Array.isArray(object)) {
    return mapArray(object) as T;
  }

  Object.entries(object).forEach(([key, value]) => {
    const [newKey, newValue] = fn(key, value, object);
    if (deep && isObject(newValue)) {
      target![newKey] = Array.isArray(newValue)
        ? mapArray(newValue)
        : mapObject(newValue as Record<string, unknown>, fn, options);
    } else {
      target![newKey] = newValue;
    }
  });

  return target as T;
};

export default mapObject;
