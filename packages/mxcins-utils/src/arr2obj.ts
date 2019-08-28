export interface IArr2objOptions<T> {
  key?: keyof T;
  clone?: boolean;
  prefix?: string;
  suffix?: string;
}

/**
 * array to object by key
 * @param {Array}           arr
 * @param {IArr2objOptions} options
 */
export default function arr2obj<T extends Record<string, any>>(
  arr: T[],
  options: IArr2objOptions<T> = {},
) {
  if (!Array.isArray(arr)) {
    throw new Error('arr2obj first arg MUST be array');
  }
  const { key = 'id', clone = false, prefix = '', suffix = '' } = options;
  return arr.reduce<Record<string, T>>((prev, item) => {
    if (item && item[key]) {
      prev[`${prefix}${item[key]}${suffix}`] = clone ? { ...item } : item;
    }
    return prev;
  }, {});
}
