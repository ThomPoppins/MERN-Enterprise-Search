'use strict'

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'eslint:all',
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-magic-numbers': 'off',
    'sort-imports': 'off',
  },
}
