module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['standard-with-typescript', 'prettier', 'plugin:prettier/recommended'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['tsconfig.json'],
  },
  rules: {
    'prettier/prettier': 2,
  },
};
