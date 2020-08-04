export interface IArr2objOptions<T> {
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
 * @param {IArr2objOptions<T>} [options={}]
 * @returns
 */
export default function arr2obj<T extends Record<string, any>>( // eslint-disable-line @typescript-eslint/no-explicit-any
  arr: T[],
  options: IArr2objOptions<T> = {},
) {
  if (!Array.isArray(arr)) {
    throw new TypeError('arr2obj first arg MUST be array.');
  }
  const { key = 'id', delimiter = '-', clone = false, prefix = '', suffix = '' } = options;

  return arr.reduce<Record<string, T>>((prev, item) => {
    const center = Array.isArray(key) ? key.map(k => item[k]).join(delimiter) : item[key];
    if (item && center) {
      // eslint-disable-next-line no-param-reassign
      prev[`${prefix}${center}${suffix}`] = clone ? { ...item } : item;
    }
    return prev;
  }, {});
}
