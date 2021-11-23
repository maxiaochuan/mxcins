const CELL_DELIMITERS = [',', ';', '\t', '|', '^'];
const LINE_DELIMITERS = ['\r\n', '\r', '\n'];

const STANDARD_DECODE_OPTS = {
  newline: LINE_DELIMITERS[0],
  delimiter: CELL_DELIMITERS[0],
};

const STANDARD_ENCODE_OPTS = {
  newline: LINE_DELIMITERS[0],
  delimiter: CELL_DELIMITERS[0],
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ANY = any;
type V = string | number;

interface DecodeOpts {
  newline?: string;
  delimiter?: string;
  fields?: boolean;
}

interface DecodeOptsWithoutFields extends DecodeOpts {
  fields: false;
}

interface DecodeOptsWithFields extends DecodeOpts {
  fields: true;
}

interface EncodeOpts {
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

const unsafeParse = (text: string, opts: Required<DecodeOpts>): V[][] => {
  const { delimiter, newline } = opts;
  const rows = text.split(newline);

  return rows.map(row => row.split(delimiter));
};

const safeParse = (text: string, opts: Required<DecodeOpts>): V[][] => {
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

  // eslint-disable-next-line unicorn/explicit-length-check
  if (cell.length) {
    push('row');
  }

  return rows;
};

interface DecodeMethod<R = false> {
  <T extends Record<string, V> = ANY>(text: string, options: DecodeOptsWithFields): {
    data: T[];
    fields: string[];
  };
  <T extends Record<string, V> = ANY>(text: string, options: DecodeOptsWithoutFields): T[];
  <T extends Record<string, V> = ANY>(text: string, options?: DecodeOpts): R extends true
    ? { data: T[]; fields: string[] }
    : T[];
}

export const decode: DecodeMethod = <T extends Record<string, V>>(
  text: string,
  options: DecodeOpts = {},
) => {
  const opts = {
    ...STANDARD_DECODE_OPTS,
    delimiter: options.delimiter || mostFrequent(text, CELL_DELIMITERS),
    newline: options.newline || mostFrequent(text, LINE_DELIMITERS),
    fields: false,
    ...options,
  };

  const quoteMark = '"';
  const ret: T[] = [];

  const hasQuote = text.includes(quoteMark);

  const rows = (hasQuote ? safeParse : unsafeParse)(text, opts);

  const fields = rows.shift() || [];

  while (rows.length > 0) {
    const row = rows.shift();
    // 筛选空行
    if (row && row.some(Boolean)) {
      // eslint-disable-next-line unicorn/no-array-reduce
      const r = fields.reduce<ANY>((prev, f, i) => {
        prev[f] = row[i] || '';
        return prev;
      }, {} as T);
      ret.push(r);
    }
  }

  if (opts.fields) {
    return { data: ret, fields } as ANY;
  }

  return ret as ANY;
};

const encodeRow = (arr: string[], options: Omit<EncodeOpts, 'fields'> = {}) => {
  const { delimiter, newline } = { ...STANDARD_ENCODE_OPTS, ...options };
  return `${arr.join(delimiter)}${newline}`;
};

export function encode(input: Record<string, unknown>[], options: EncodeOpts): string {
  const opts = {
    ...STANDARD_ENCODE_OPTS,
    ...options,
  };

  const { fields, ...rest } = opts;

  const fieldsIsArray = Array.isArray(fields);
  const properties = fieldsIsArray ? (fields as string[]) : Object.keys(fields);

  const header = fieldsIsArray
    ? properties
    : properties.map(property => (fields as Record<string, string>)[property]);

  const content = input.map(r => properties.map(property => `${r[property]}`));

  const csv = `${encodeRow(header, rest)}${content.map(c => encodeRow(c, rest))}`;

  return csv;
}
