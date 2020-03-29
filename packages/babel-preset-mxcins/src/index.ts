/* eslint-disable global-require */
import { dirname } from 'path';

export interface IOpts {
  debug?: boolean;
  env?: {};
  react?: {};
  typescript?: {};
  transformRuntime?: boolean;
}

export default (_: any, { debug, env, react, typescript, transformRuntime }: IOpts = {}) => ({
  presets: [
    [
      require('@babel/preset-env').default,
      {
        ...env,
        debug,
        exclude: ['transform-modules-amd', 'transform-modules-umd', 'transform-modules-systemjs'],
      },
    ],
    react && [require('@babel/preset-react').default, react],
    typescript && [
      require('@babel/preset-typescript').default,
      { ...typescript, allowNamespaces: true, onlyRemoveTypeImports: true },
    ],
  ].filter(Boolean),
  plugins: [
    [require('@babel/plugin-transform-destructuring').default, { loose: false }],
    [require('@babel/plugin-proposal-decorators').default, { legacy: true }],
    [require('@babel/plugin-proposal-class-properties').default, { loose: true }],
    require('@babel/plugin-proposal-export-default-from').default,
    [
      require('@babel/plugin-proposal-pipeline-operator').default,
      {
        proposal: 'minimal',
      },
    ],
    require('@babel/plugin-proposal-optional-chaining'),
    transformRuntime && [
      require('@babel/plugin-transform-runtime').default,
      {
        corejs: 3,
        version: require('@babel/runtime/package.json').version,
        // https://github.com/umijs/umi/blob/master/packages/babel-preset-umi/src/index.ts
        absoluteRuntime: dirname(require.resolve('@babel/runtime/package.json')),
        // https://babeljs.io/docs/en/babel-plugin-transform-runtime#useesmodules
        useESModules: true,
      },
    ],
  ].filter(Boolean),
});
