/**
 *
 * @param obj
 * @param keys
 */
export default function omit<T extends {}, K extends keyof T>(
  obj: T,
  keys: K[],
): Pick<T, Exclude<keyof T, K>> {
  const copy = { ...obj };
  keys.forEach(key => {
    delete copy[key];
  });
  return copy;
}
