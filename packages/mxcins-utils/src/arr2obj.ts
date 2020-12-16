type R<U = unknown> = Record<string, U>;

interface Opts<T = R> {
  /**
   * @default id
   * @type {(keyof T | (keyof T)[])}
   * @memberof Opts
   */
  key?: keyof T | (keyof T)[];
  clone?: boolean;
  prefix?: string;
  suffix?: string;
  delimiter?: string;
}

/**
 * @description array to object, support mutiple keys
 * @author Xiaochuan Ma <mxcins@gmail.com>
 * @date 2019-09-20
 * @export
 * @template T
 * @param {T[]} arr
 * @param {Opts<T>} [options={}]
 * @returns {Record<string, T>}
 */
export default function arr2obj<T extends R>(arr: T[], options: Opts<T> = {}): R<T> {
  if (!Array.isArray(arr)) {
    throw new TypeError('first argument MUST be array.');
  }
  const { key = 'id', delimiter = '-', clone, prefix = '', suffix = '' } = options;

  return arr.reduce<R<T>>((prev, item) => {
    const center = Array.isArray(key) ? key.map(k => item[k]).join(delimiter) : item[key];
    if (item && center) {
      // eslint-disable-next-line no-param-reassign
      prev[`${prefix}${center}${suffix}`] = clone ? { ...item } : item;
    }
    return prev;
  }, {});
}
