import globals from 'globals';

import path from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import pluginJs from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import fp from 'eslint-plugin-fp';

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: pluginJs.configs.recommended,
});

export default [
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      parserOptions: {
        // Eslint doesn't supply ecmaVersion in `parser.js` `context.parserOptions`
        // This is required to avoid ecmaVersion < 2015 error or 'import' / 'export' error
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: { import: importPlugin, fp },
    rules: {
      ...importPlugin.configs.recommended.rules,
    },
  },
  ...compat.extends('airbnb-base'),
  ...compat.extends('plugin:jest/recommended'),
  ...compat.extends('plugin:fp/recommended'),
  {
    rules: {
      'no-underscore-dangle': [
        2,
        {
          allow: ['__filename', '__dirname'],
        },
      ],
      'import/extensions': 'off',
      'import/no-named-as-default': 'off',
      'import/no-named-as-default-member': 'off',
      'no-console': 'off',
      'import/no-extraneous-dependencies': 'off',
      'fp/no-nil': 'off',
      'fp/no-unused-expression': 'off',
      'fp/no-throw': 'off',
      'fp/no-mutating-methods': ['error', { allowedObjects: ['_'] }],
    },
  },
];