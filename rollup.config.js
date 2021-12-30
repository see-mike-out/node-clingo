import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import bundleSize from 'rollup-plugin-bundle-size';
import json from '@rollup/plugin-json';
import builtins from 'rollup-plugin-node-builtins';
import {terser} from 'rollup-plugin-terser';

const extensions = ['.js', '.ts'];

export default {
  input: 'src/index.ts',
  output: [{
    file: 'build/node-clingo.js',
    sourcemap: true,
    format: 'umd',
    name: 'nodeClingo'
  },
  {
    file: 'build/node-clingo.min.js',
    format: 'umd',
    sourcemap: true,
    name: 'nodeClingo',
    plugins: [terser()]
  }],
  plugins: [
    builtins({include: 'util'}),
    resolve({ browser: true, extensions }),
    commonjs(),
    json(),
    babel({
      extensions,
      babelHelpers: 'bundled',
      presets: [
        [
          '@babel/env',
          {
            targets: 'defaults and not IE 11'
          }
        ],
        '@babel/typescript'
      ]
    }),
    bundleSize()
  ]
};