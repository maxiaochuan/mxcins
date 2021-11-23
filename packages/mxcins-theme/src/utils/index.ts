import path from 'path';

// eslint-disable-next-line unicorn/prefer-module
export const antdPackagePath = require.resolve('antd/package.json');
export const antdPath = path.dirname(antdPackagePath);
