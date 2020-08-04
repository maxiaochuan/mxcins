/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
const config = {
  presets: [[require.resolve('../packages/babel-preset-mxcins/node'), {}]],
};

module.exports = require('babel-jest').createTransformer(config);
