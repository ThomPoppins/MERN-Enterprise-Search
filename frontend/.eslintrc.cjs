'use strict'

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:all',
    'plugin:react/all',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/strict',
    'prettier',
  ],
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
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks', 'jsx-a11y'],
  rules: {
    'capitalized-comments': 'off',
    'consistent-return': 'off',
    'default-param-last': 'off',
    'max-lines-per-function': 'off',
    'no-magic-numbers': 'off',
    'no-nested-ternary': 'off',
    'no-ternary': 'off',
    'no-warning-comments': 'off',
    'one-var': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react/display-name': 'error',
    'react/forbid-component-props': [
      'error',
      { allow: ['className'], forbid: [] },
    ],
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/jsx-key': 'error',
    'react/jsx-max-depth': ['error', { max: 10 }],
    // Allow arrow functions in JSX props (Remove this rule when performance becomes an issue)
    'react/jsx-no-bind': ['error', { allowArrowFunctions: true }],
    'react/jsx-no-comment-textnodes': 'error',
    'react/jsx-no-literals': 'off',
    'react/jsx-no-target-blank': 'error',
    'react/jsx-no-undef': 'error',
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/no-children-prop': 'error',
    'react/no-danger-with-children': 'error',
    'react/no-deprecated': 'error',
    'react/no-direct-mutation-state': 'error',
    'react/no-find-dom-node': 'error',
    'react/no-is-mounted': 'error',
    'react/no-render-return-value': 'error',
    'react/no-string-refs': 'error',
    'react/no-unescaped-entities': 'error',
    'react/no-unknown-property': 'error',
    'react/prop-types': 'error',
    'react/react-in-jsx-scope': 'error',
    'react/require-render-return': 'error',
    'sort-imports': 'off',
    'sort-vars': 'off',
    'sort-keys': 'off',
    // TODO: Set the no-console rule to error when going in to production
    'no-console': 'warn',
    'multiline-comment-style': 'off',
    'max-statements': 'off',
    'max-lines': 'off',
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
  },
  settings: {
    react: {
      linkComponents: [
        // Components used as alternatives to <a> for linking, eg. <Link to={ url } />
        'Hyperlink',
        { linkAttribute: 'to', name: 'Link' },
      ],
      version: 'detect',
    },
  },
}
