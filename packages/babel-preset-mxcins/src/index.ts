/* eslint-disable global-require, @typescript-eslint/no-var-requires, @typescript-eslint/explicit-module-boundary-types */
import type { Options as ENV } from '@babel/preset-env';

interface ImportPluginOpts {
  libraryName: string;
  libraryDirectory?: string;
  style?: boolean;
  camel2DashComponentName?: boolean;
}

export interface PresetOpts {
  env?: ENV;
  debug?: boolean;
  react?: boolean | Record<string, unknown>;
  typescript?: boolean | Record<string, unknown>;
  transformRuntime?: boolean | Record<string, unknown>;
  styledComponents?: boolean | Record<string, unknown>;
  import?: ImportPluginOpts[];
}

const toObject = (input: unknown) => (typeof input === 'object' ? input : {});

export default (
  _: unknown,
  {
    debug,
    env,
    react,
    typescript,
    transformRuntime,
    styledComponents,
    import: imports,
  }: PresetOpts = {},
) => ({
  presets: [
    [
      require('@babel/preset-env').default,
      {
        ...env,
        debug,
        exclude: [
          'transform-typeof-symbol',
          'transform-modules-amd',
          'transform-modules-umd',
          'transform-modules-systemjs',
        ],
      },
    ],
    react && [require('@babel/preset-react').default, toObject(react)],
    typescript && [
      require('@babel/preset-typescript').default,
      { ...toObject(typescript), allowNamespaces: true, onlyRemoveTypeImports: true },
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
    require('@babel/plugin-proposal-optional-chaining').default,
    transformRuntime && [
      require('@babel/plugin-transform-runtime').default,
      {
        version: require('@babel/runtime/package.json').version,
        // https://github.com/umijs/umi/blob/master/packages/babel-preset-umi/src/index.ts
        // 2020-03-30 01:07:20 在 yarn link 之后路径会有问题 打包dependency 的 import 很奇怪 暂时去掉
        // absoluteRuntime: dirname(require.resolve('@babel/runtime/package.json')),
        // https://babeljs.io/docs/en/babel-plugin-transform-runtime#useesmodules
        useESModules: true,
        ...toObject(transformRuntime),
      },
    ],
    styledComponents && [
      require('babel-plugin-styled-components').default,
      { ssr: false, ...toObject(styledComponents) },
    ],
    ...(imports
      ? imports.map(o => {
          return [require('babel-plugin-import').default, o, o.libraryName];
        })
      : []),
  ].filter(Boolean),
});
