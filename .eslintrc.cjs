'use strict';

module.exports = {
    'env': {
        'browser': true,
        'es2021': true
    },
    'extends': ['eslint:all'],
    'overrides': [
        {
            'env': {
                'node': true
            },
            'files': ['.eslintrc.{js,cjs}'],
            'parserOptions': {
                'sourceType': 'script'
            }
        }
    ],
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true
        },
        'ecmaVersion': 'latest',
        'sourceType': 'module'
    },
    'plugins': [],
    'rules': {
        'quotes': [
            'error',
            'single'
        ]
    },
    'settings': {}
};
