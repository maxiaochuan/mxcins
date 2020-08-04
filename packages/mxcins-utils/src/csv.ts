const CELL_DELIMITERS = [',', ';', '\t', '|', '^'];
const LINE_DELIMITERS = ['\r\n', '\r', '\n'];

const STANDARD_DECODE_OPTS = {
  // newline: LINE_DELIMITERS[0],
  // delimiter: CELL_DELIMITERS[0],
};

const STANDARD_ENCODE_OPTS = {
  newline: LINE_DELIMITERS[0],
  delimiter: CELL_DELIMITERS[0],
};

interface IDecodeOpts {
  newline?: string;
  delimiter?: string;
  fields?: boolean;
}

interface IEncodeOpts {
  newline?: string;
  delimiter?: string;
  fields: string[] | Record<string, string>;
}

const mostFrequent = (text: string, delimiters: string[]) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const current of delimiters) {
    const index = text.indexOf(current);
    if (index !== -1) {
      return current;
    }
  }

  return delimiters[0];
};

const unsafeParse = (text: string, opts: Required<IDecodeOpts>): any[][] => {
  const lines = text.split(opts.newline).filter(Boolean);

  if (!lines.length) {
    throw new Error(`csv parser error: lines length ${lines.length}`);
  }

  const cells = (line: string) => line.split(opts.delimiter);
  return lines.map(line => cells(line));
};

const safeParse = (text: string, opts: Required<IDecodeOpts>): any[][] => {
  const { newline, delimiter } = opts;
  const quoteMark = '"';
  const len = text.length;
  let cur = 0;
  let inQuote = false;
  const rows: string[][] = [];
  let rowIndex = 0;
  let colIndex = 0;
  let cell = '';

  const push = (next: 'row' | 'col') => {
    rows[rowIndex] = rows[rowIndex] || [];
    rows[rowIndex][colIndex] = cell.trim();
    cell = '';
    if (next === 'row') {
      rowIndex += 1;
      colIndex = 0;
    }
    if (next === 'col') {
      colIndex += 1;
    }
  };

  while (cur < len) {
    const str = text[cur];
    if (inQuote) {
      if (str === quoteMark && text[cur - 1] !== '\\') {
        inQuote = false;
        cur += 1;
      } else {
        cell += str;
        cur += 1;
      }
    } else {
      // eslint-disable-next-line no-lonely-if
      if (str === quoteMark && text[cur - 1] !== '\\') {
        inQuote = true;
        cur += 1;
      } else {
        // eslint-disable-next-line no-lonely-if
        if (str === delimiter) {
          push('col');
          cur += 1;
        } else if (str === newline[0]) {
          if (newline === '\r\n') {
            if (text[cur + 1] === '\n') {
              push('row');
              cur += 2;
            } else {
              cell += str;
              cur += 1;
            }
          } else {
            push('row');
            cur += 1;
          }
        } else {
          cell += str;
          cur += 1;
        }
      }
    }
  }

  if (cell.length) {
    push('row');
  }

  return rows;
};

export function decode(text: string, options: IDecodeOpts = {}) {
  const opts = {
    ...STANDARD_DECODE_OPTS,
    delimiter: options.delimiter || mostFrequent(text, CELL_DELIMITERS),
    newline: options.newline || mostFrequent(text, LINE_DELIMITERS),
    fields: false,
    ...options,
  };

  const quoteMark = '"';
  const ret: Array<Record<string, any>> = [];

  const hasQuote = text.includes(quoteMark);

  const rows = (hasQuote ? safeParse : unsafeParse)(text, opts);

  const fields = rows.shift() || [];

  while (rows.length) {
    const row = rows.shift();
    // 筛选空行
    if (row && row.filter(Boolean).length !== 0) {
      ret.push(
        fields.reduce<Record<string, string>>((prev, f, i) => {
          // eslint-disable-next-line no-param-reassign
          prev[f] = row[i] || '';
          return prev;
        }, {}),
      );
    }
  }

  if (opts.fields) {
    return { data: ret, fields };
  }

  return ret;
}

export function encode(objects: Array<Record<string, string | number>>, options: IEncodeOpts) {
  const opts = {
    ...STANDARD_ENCODE_OPTS,
    ...options,
  };

  const { fields } = opts;

  const isArr = Array.isArray(fields);
  const keys = isArr ? (fields as string[]) : Object.keys(fields);

  const text = objects.reduce((prev, obj) => {
    prev += keys.map(f => obj[f]).join(opts.delimiter) + opts.newline;
    return prev;
  }, (isArr ? keys : keys.map(k => (fields as Record<string, string>)[k])).join(opts.delimiter) + opts.newline);

  return text;
}
