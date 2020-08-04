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
              targets: { node: 10 },
              modules: 'commonjs',
            },
            react: {},
            typescript: {},
          },
          opts,
        ),
      ],
    ],
  };
};
