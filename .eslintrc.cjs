export default {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:all'],
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
  plugins: [],
  rules: {
    'no-unused-vars': ['error', { varsIgnorePattern: '^React$' }],
    quotes: ['error', 'single'],
    'one-var': ['error', 'never'],
  },
  settings: {},
}
