import path from 'path'
import {nodeResolve} from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import pkg from './package.json'

const extensions = ['.js', '.ts']

const resolve = function(...args) {
  return path.resolve(__dirname, ...args)
}

module.exports = {
  input: resolve('./src/index.ts'),
  output: {
    file: resolve('./', pkg.main),
    format: 'esm',
  },
  plugins: [
    nodeResolve({
      extensions,
      modulesOnly: true,
    }),
    typescript({ tsconfig: './tsconfig.json' }),
  ],
  external: [
    'redux',
    'redux-saga',
    'redux-saga/effects',
    'tslib',
  ],
}
