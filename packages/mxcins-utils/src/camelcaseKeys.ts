import { camelCase } from 'lodash';
import caseKeys, { ICaseKeysOpts } from './caseKeys';

const camelcaseKeys = <T = unknown>(input: unknown, opts: ICaseKeysOpts = {}): T =>
  caseKeys(input, opts, camelCase);

export default camelcaseKeys;
