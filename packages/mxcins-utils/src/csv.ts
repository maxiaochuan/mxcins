const CELL_DELIMITERS = [",", ";", "\t", "|", "^"];
const LINE_DELIMITERS = ["\r\n", "\r", "\n"];

const STANDARD_DECODE_OPTS = {
  // newline: LINE_DELIMITERS[0],
  // delimiter: CELL_DELIMITERS[0],
}

const STANDARD_ENCODE_OPTS = {
  newline: LINE_DELIMITERS[0],
  delimiter: CELL_DELIMITERS[0],
}

interface IDecodeOpts {
  newline?: string;
  delimiter?: string;
}

interface IEncodeOpts {
  newline?: string;
  delimiter?: string;
  fields: string[] | Record<string, string>;
}

const mostFrequent = (text: string, delimiters: string[]) => {
  for (let i = 0; i < delimiters.length; i += 1) {
    const current = delimiters[i];
    const index = text.indexOf(current);
    if (index !== -1) {
      return current;
    }
  }

  return delimiters[0];
}

export function decode (text: string, options: IDecodeOpts = {}) {
  const opts = {
    ...STANDARD_DECODE_OPTS,
    delimiter: options.delimiter || mostFrequent(text, CELL_DELIMITERS),
    newline: options.newline || mostFrequent(text, LINE_DELIMITERS),
    ...options,
  }; 

  // TODO: unsafe quote
  const lines = text.split(opts.newline).filter(Boolean);

  if (!lines.length) {
    throw new Error(`csv parser error: lines length ${lines.length}`);
  }

  const cells = (line: string) => line.split(opts.delimiter);

  const fields = cells(lines.shift() as string);

  const ret: Array<Record<string, any>> = [];
  while (lines.length) {
    const row = cells(lines.shift() as string);
    // 筛选空行
    if (row.filter(Boolean).length !== 0) {
      ret.push(fields.reduce<Record<string, string>>((prev, f, i) => {
        // eslint-disable-next-line no-param-reassign
        prev[f] = row[i].trim();
        return prev;
      }, {}))
    }

  }

  return ret;
}

export function encode (objects: Array<Record<string, string | number>>, options: IEncodeOpts) {
  const opts = {
    ...STANDARD_ENCODE_OPTS,
    ...options,
  }

  const { fields } = opts;

  const isArr = Array.isArray(fields);
  const keys = isArr ? fields as string[] : Object.keys(fields);

  const text = objects.reduce((prev, obj) => {
    prev += keys.map(f => obj[f]).join(opts.delimiter) + opts.newline;
    return prev;
  }, (isArr ? keys : keys.map(k => (fields as Record<string, string>)[k])).join(opts.delimiter) + opts.newline);

  return text;
}