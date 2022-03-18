import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { defineConfig } from 'rollup';
import pkg from './package.json';

export default defineConfig({
  input: 'src/index.ts',
  plugins: [resolve(), commonjs(), typescript()],
  output: [{ file: pkg.main, format: 'cjs' }],
});
