/**
 * Omit some keys from object
 * @param  {T extends {}}      obj
 * @param  {K extends keyof T} keys
 * @return {Omit<T, K>}
 */
export default function omit<T extends {}, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const copy = { ...obj };
  keys.forEach(key => {
    delete copy[key];
  });
  return copy;
}
