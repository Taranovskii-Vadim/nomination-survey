'use strict';

const REACT_RULES = {
  '@typescript-eslint/no-unused-vars': 'error',
  '@typescript-eslint/explicit-function-return-type': [
    'warn',
    { allowExpressions: true, allowHigherOrderFunctions: true, allowTypedFunctionExpressions: true },
  ],
};

const CONFIG_RULES = {
  strict: ['error', 'global'],
  '@typescript-eslint/no-var-requires': 'off',
};

module.exports = {
  extends: [
    'eslint:recommended',
    'airbnb-typescript',
    'plugin:import/recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['@typescript-eslint', 'import', 'react'],
  parser: '@typescript-eslint/parser',
  ignorePatterns: ['.eslintrc.js'],
  parserOptions: { project: ['./tsconfig.json'] },
  rules: {
    'no-console': 'error',
    'import/no-unresolved': 'warn',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
  },
  overrides: [
    { files: ['./src/**/*.{ts,tsx}'], rules: REACT_RULES },
    {
      files: ['./*.js', './configs/**/*.js'],
      env: { node: true },
      parserOptions: { sourceType: 'script' },
      rules: CONFIG_RULES,
    },
  ],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: { alwaysTryTypes: true, project: './tsconfig.json' },
    },
    react: {
      version: 'detect',
    },
  },
};
