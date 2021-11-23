import { snakeCase } from 'lodash';
import caseKeys, { ICaseKeysOpts } from './caseKeys';

const snakecaseKeys = <T = unknown>(input: unknown, opts: ICaseKeysOpts = {}): T =>
  caseKeys(input, opts, snakeCase);

export default snakecaseKeys;
