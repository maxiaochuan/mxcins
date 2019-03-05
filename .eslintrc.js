module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    mocha: true,
    jest: true,
    jasmine: true,
  },
  extends: ['airbnb', 'prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'import/no-extraneous-dependencies': [2, { devDependencies: true }],
    'no-param-reassign': 0,
    'no-console': 0,
    'global-require': 0,
    'import/no-dynamic-require': 0,
  },
};
