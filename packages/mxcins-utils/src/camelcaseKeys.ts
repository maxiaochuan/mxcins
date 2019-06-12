import { isObject } from '@mxcins/lodash';
import { camelCase } from 'lodash-es';

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

const camelcaseKeys = <T extends any = any>(input: any, opts: ICamelcaseKeysOpts = {}): T => {
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
        const ret = camelCase(key);
        cache.set(key, ret);
        key = ret;
      }
    }
    return [key, value];
  };

  if (Array.isArray(input)) {
    return (input as any[]).map(v => {
      return isObjectOrArray(v) ? mapObject(v, fn, options) : v;
    }) as any;
  }
  return isObjectOrArray(input) ? mapObject(input, fn, options) : input;
};

export default camelcaseKeys;
