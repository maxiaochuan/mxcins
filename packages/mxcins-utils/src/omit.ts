/**
 * @description omit
 * @author Xiaochuan Ma <mxcins@gmail.com>
 * @date 2019-09-20
 * @export
 * @template T
 * @template K
 * @param {T} target
 * @param {K[]} keys
 * @returns {Omit<T, K>}
 */
export default function omit<T extends Record<string, unknown>, K extends keyof T>(
  target: T,
  keys: K[],
): Omit<T, K> {
  const copy = { ...target };
  keys.forEach(key => {
    delete copy[key];
  });
  return copy;
}
