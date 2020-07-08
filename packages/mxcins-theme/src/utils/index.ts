import { dirname } from 'path';

export const antdPackagePath = require.resolve('antd/package.json');
export const antdPath = dirname(antdPackagePath);
