import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json';
import typescript from '@rollup/plugin-typescript';

console.log('r', process.cwd());
export default [
  // browser-friendly UMD build
  // {
  //   input: 'src/main.js',
  //   output: {
  //     name: 'howLongUntilLunch',
  //     file: pkg.browser,
  //     format: 'umd'
  //   },
  //   plugins: [
  //     resolve(), // so Rollup can find `ms`
  //     commonjs() // so Rollup can convert `ms` to an ES module
  //   ]
  // },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)
  // {
  //   input: 'src/index.ts',
  //   plugins: [
  //     typescript(),
  //   ],
  //   output: [
  //     { file: pkg.main, format: 'cjs' },
  //     { file: pkg.module, format: 'es' }
  //   ]
  // }
  {
    input: 'src/index.ts',
    plugins: [
      resolve(),
      commonjs(),
      typescript(),
    ],
    output: [
      { file: pkg.main, format: 'cjs' },
      // { file: pkg.module, format: 'es' }
    ]
  },
  {
    input: 'src/runtime/dynamic.tsx',
    plugins: [
      typescript(),
    ],
    output: [
      { file: 'dynamic.js', format: 'es' }
    ]
  }
];