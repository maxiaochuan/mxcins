import { isObject } from '@mxcins/lodash';
import camelcase from 'camelcase';

import { IObjectType } from '@mxcins/types';
import mapObject from './mapObject';

const cache = new Map();

export interface ICamelcaseKeysOpts {
  /**
   * @default false
   *
   */
  readonly deep?: boolean;

  /**
   * @default []
   */
  readonly exclude?: Array<string | RegExp>;
}

const isObjectOrArray = (input: unknown) => Array.isArray(input) || isObject(input);
const has = (array: Array<string | RegExp>, key: string) =>
  array.some(x => (typeof x === 'string' ? x === key : x.test(key)));

const camelcaseKeys = (
  input: IObjectType<unknown> | Array<IObjectType<unknown>>,
  opts: ICamelcaseKeysOpts = {},
) => {
  const options = {
    deep: false,
    ...opts,
  };

  const { exclude } = options;

  const fn = (key: string, value: unknown): [string, unknown] => {
    if (!(exclude && has(exclude, key))) {
      if (cache.get(key)) {
        key = cache.get(key);
      } else {
        const ret = camelcase(key);
        cache.set(key, ret);
        key = ret;
      }
    }
    return [key, value];
  };

  if (Array.isArray(input)) {
    return (input as Array<unknown>).map(v => {
      return isObjectOrArray(v) ? mapObject(v as any, fn, options) : v;
    }) as Array<IObjectType<unknown>>;
  }
  return isObjectOrArray(input) ? mapObject(input as any, fn, options) : input;
};

export default camelcaseKeys;
