import { camelCase } from 'lodash';
import caseKeys, { ICaseKeysOpts } from './caseKeys';

const camelcaseKeys = <T = unknown>(input: unknown, opts: ICaseKeysOpts = {}): T => {
  return caseKeys(input, opts, camelCase);
};

export default camelcaseKeys;
