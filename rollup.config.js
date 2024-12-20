import { defineConfig } from 'rollup'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'

export default defineConfig([
  {
    input: 'scripts/content.ts',
    output: {
      file: 'dist/content.js',
      format: 'iife',
      name: 'content'
    },
    plugins: [
      resolve(),
      typescript({
        noEmit: false,
        tsconfig: './tsconfig.json'
      })
    ]
  },
  {
    input: 'scripts/background.ts',
    output: {
      file: 'dist/background.js',
      format: 'iife',
      name: 'background'
    },
    plugins: [resolve(), typescript()]
  },
  {
    input: 'popup/popup.ts',
    output: {
      file: 'dist/popup.js',
      format: 'iife',
      name: 'popup'
    },
    plugins: [
      resolve(),
      typescript({
        noEmit: false,
        tsconfig: './tsconfig.json'
      })
    ]
  }
])
