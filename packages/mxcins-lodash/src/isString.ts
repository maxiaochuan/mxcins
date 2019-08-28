/**
 * Input is string
 * @param  {unknown} input
 * @return {boolean}
 */
export default function isString(input: unknown): input is string {
  return typeof input === 'string';
}
