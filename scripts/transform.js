const config = {
  presets: [
    [require.resolve('../packages/babel-preset-mxcins/dist/index.cjs.js'), { typescript: true }],
  ],
};

module.exports = require('babel-jest').createTransformer(config);
