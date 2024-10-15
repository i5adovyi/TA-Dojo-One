import { default as js, default as pluginJs } from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.browser } },
  js.configs.recommended,
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,

  {
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
    },
  },
  {
    env: {
      node: true,
    },
  },
];
