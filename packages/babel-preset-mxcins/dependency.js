/* eslint-disable global-require */

// eslint-disable-next-line func-names
module.exports = function(_, opts) {
  return {
    presets: [
      [
        require('./dist/index.cjs').default,
        require('deepmerge', {
          typescript: true,
          react: true,
          env: {
            useBuiltIns: 'entry',
            corejs: 3,
            modules: false,
          },
          transformRuntime: true,
        }, opts),
      ],
    ],
  };
};
