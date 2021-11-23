/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable func-names */
/* eslint-disable unicorn/prefer-module */

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
