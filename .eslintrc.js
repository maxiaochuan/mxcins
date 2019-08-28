const { eslint } = require('@mxcins/bedrock');

module.exports = {
  ...eslint,
  rules: {
    ...eslint.rules,
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
  },
};
