/**
 * Input is object
 * @param  {unknown} input
 * @return {boolean}
 */
export default function isObject(input: unknown): input is object {
  const type = typeof input;
  return input != null && (type === 'object' || type === 'function');
}
