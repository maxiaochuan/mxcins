import { isObject } from '@mxcins/lodash';
import { IObjectType } from '@mxcins/types';

export interface IMapObjectOpts {
  deep?: boolean;
  target?: IObjectType;
}

export type Fn = (key: string, value: unknown, object: any) => [string, unknown];

const mapObject = (object: IObjectType, fn: Fn, opts: IMapObjectOpts = {}) => {
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

  for (const [key, value] of Object.entries(object)) {
    const [newKey, newValue] = fn(key, value, object);
    target[newKey] =
      deep && isObject(newValue)
        ? Array.isArray(newValue)
          ? mapArray(newValue)
          : mapObject(newValue, fn, options)
        : newValue;
  }

  return target;
};

export default mapObject;
