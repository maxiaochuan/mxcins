/* eslint-disable unicorn/no-nested-ternary, unicorn/no-null */
/**
 * @description
 * @author Xiaochuan Ma <mxcins@gmail.com>
 * @date 2019-09-20
 * @export
 * @template R
 * @param {string} txt
 * @param {(key: any, value: any) => any} [reviver]
 * @param {number} [context]
 * @returns {R}
 */
export default function parseJson<R = any>(
  txt: string,
  reviver?: (key: any, value: any) => any,
  context = 20,
): R {
  try {
    return JSON.parse(txt, reviver);
  } catch (error) {
    if (typeof txt !== 'string') {
      const isEmptyArray = Array.isArray(txt) && (txt as any[]).length === 0;
      const errorMessage = `Cannot parse ${isEmptyArray ? 'an empty array' : String(txt)}`;
      throw new TypeError(errorMessage);
    }
    const syntaxErr = error.message.match(/^unexpected token.*position\s+(\d+)/i);
    // eslint-disable-next-line no-nested-ternary
    const errIdx = syntaxErr
      ? +syntaxErr[1]
      : error.message.match(/^unexpected end of json.*/i)
      ? txt.length - 1
      : null;

    if (errIdx !== null) {
      const start = errIdx <= context ? 0 : errIdx - context;
      const end = errIdx + context >= txt.length ? txt.length : errIdx + context;
      error.message += ` while parsing near '${start === 0 ? '' : '...'}${txt.slice(start, end)}${
        end === txt.length ? '' : '...'
      }'`;
    } else {
      error.message += ` while parsing '${txt.slice(0, context * 2)}'`;
    }
    throw error;
  }
}
