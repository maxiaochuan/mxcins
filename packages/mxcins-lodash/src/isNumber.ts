/**
 * Input is number
 * @param  {unknown} input
 * @return {boolean}
 */
export default function isNumber(input: unknown): input is number {
  return typeof input === 'number';
}
