/* eslint-disable func-names */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable global-require, @typescript-eslint/no-var-requires */

module.exports = function (_, opts) {
  return {
    presets: [
      [
        require('./dist/index.cjs').default,
        require('deepmerge')(
          {
            env: {
              useBuiltIns: 'entry',
              corejs: 3,
              modules: false,
            },
            react: {},
            typescript: {},
            transformRuntime: {},
          },
          opts,
        ),
      ],
    ],
  };
};
