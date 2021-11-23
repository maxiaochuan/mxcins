const { eslint } = require('@mxcins/bedrock');

module.exports = {
  ...eslint,
  rules: {
    ...eslint.rules,
    'no-restricted-syntax': 0,
    'unicorn/prefer-node-protocol': 0,
  },
};
