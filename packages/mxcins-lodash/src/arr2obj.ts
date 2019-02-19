export interface IArr2objOptions<T> {
  key?: keyof T;
  clone?: boolean;
}

export default function arr2obj<T extends { [x: string]: any }>(
  arr: T[],
  options: IArr2objOptions<T> = {},
) {
  const { key = 'id', clone = false } = options;
  return arr.reduce<{ [x: string]: T }>((prev, item) => {
    prev[item[key]] = clone ? { ...item } : item;
    return prev;
  }, {});
}
