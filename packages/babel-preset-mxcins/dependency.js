/* eslint-disable global-require, @typescript-eslint/no-var-requires */

// eslint-disable-next-line func-names
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
