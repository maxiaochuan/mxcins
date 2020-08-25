import { snakeCase } from 'lodash';
import caseKeys, { ICaseKeysOpts } from './caseKeys';

const snakecaseKeys = <T = unknown>(input: unknown, opts: ICaseKeysOpts = {}): T => {
  return caseKeys(input, opts, snakeCase);
};

export default snakecaseKeys;
