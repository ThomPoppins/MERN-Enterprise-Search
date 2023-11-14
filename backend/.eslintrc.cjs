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
    'new-cap': 'off',
    'no-magic-numbers': 'off',
    'one-var': 'off',
    'sort-imports': 'off',
    'sort-vars': 'off',
    'sort-keys': 'off',
    'no-console': 'off',
    'multiline-comment-style': 'off',
    'default-param-last': 'off',
    'capitalized-comments': 'off',
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'max-lines-per-function': 'off',
    'max-statements': 'off',
    'no-warning-comments': 'off',
  },
}
