module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    'prettier',
  ],
  'settings': {
    'react': {
      'version': 'detect',
      "linkComponents": [
        // Components used as alternatives to <a> for linking, eg. <Link to={ url } />
        "Hyperlink",
        {"name": "Link", "linkAttribute": "to"}
      ]
    },
  },
  'overrides': [
    {
      'env': {
        'node': true,
      },
      'files': [
        '.eslintrc.{js,cjs}',
      ],
      'parserOptions': {
        'sourceType': 'script',
      },
    },
  ],
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'plugins': [
    'react',
  ],
  'rules': {
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
  },
};
