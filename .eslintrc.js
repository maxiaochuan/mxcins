const { eslint } = require('@mxcins/bedrock');

module.exports = {
  ...eslint,
  rules: {
    ...eslint.rules,
    'no-restricted-syntax': 0,
  }
};
