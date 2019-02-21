export interface IArr2objOptions<T> {
  key?: keyof T;
  clone?: boolean;
}

export default function arr2obj<T extends { [x: string]: any }>(
  arr: T[],
  options: IArr2objOptions<T> = {},
) {
  if (!Array.isArray(arr)) {
    throw new Error('arr2obj first arg MUST be array');
  }
  const { key = 'id', clone = false } = options;
  return arr.reduce<{ [x: string]: T }>((prev, item) => {
    if (item && item[key]) {
      prev[item[key]] = clone ? { ...item } : item;
    }
    return prev;
  }, {});
}
