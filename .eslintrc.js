const { eslint } = require('@mxcins/bedrock');

module.exports = {
  ...eslint,
  parserOptions: {
    ...eslint.parserOptions,
    project: './tsconfig.json',
  },
  rules: {
    ...eslint.rules,
    '@typescript-eslint/no-unused-vars': ['error', {
      vars: "all",
      args: "after-used",
      argsIgnorePattern: '^_',
    }],
    'consistent-return': 0,
    'no-param-reassign': 1,
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],
  },
};
