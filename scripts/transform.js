const config = {
  presets: [[require.resolve('../packages/babel-preset-mxcins/node'), {}]],
};

module.exports = require('babel-jest').createTransformer(config);
