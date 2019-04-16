export default function isObject(input: any): input is object {
  const type = typeof input;
  return input != null && (type === 'object' || type === 'function');
}
