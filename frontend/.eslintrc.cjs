module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    "eslint:recommended",
    // "eslint:all",
    // "plugin:react/recommended",
    "plugin:react/all",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    // "plugin:react-hooks/all",
    // "plugin:jsx-a11y/recommended",
    "plugin:jsx-a11y/strict",
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
    'react-hooks',
    "jsx-a11y",
  ],
  'rules': {
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/display-name': 'error',
    'react/jsx-key': 'error',
    'react/jsx-no-comment-textnodes': 'error',
    'react/jsx-no-target-blank': 'error',
    'react/jsx-no-undef': 'error',
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
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/function-component-definition": ["error", {
      "namedComponents": "arrow-function",
      "unnamedComponents": "arrow-function"
    }],
    "react/jsx-max-depth": ["error", {"max": 5}],
    "react/jsx-no-bind": ["error", {"allowArrowFunctions": true}], // Allow arrow functions in JSX props (Remove this rule when performance becomes an issue)
    "sort-imports": "off",
    "react/forbid-component-props": ["error", {"forbid": [], "allow": ["className"]}],
    "react/jsx-no-literals": "off", // TODO: [MERNSTACK-245] Turn "react/jsx-no-literals" rule back on when the translation system is in place
    },
};
