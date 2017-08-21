module.exports = {
    'globals': {
        'window': true,
        'chrome': true
    },
    'rules': {
        'indent': [
            2,
            4,
            {'SwitchCase': 1}
        ],
        'quotes': [
            2,
            'single'
        ],
        'linebreak-style': [
            2,
            'unix'
        ],
        'semi': [
            2,
            'always'
        ],
        'no-unused-vars': [
            2, {'vars': 'local', 'args': 'none'} // check only locally unused vars. Ignore vars passed as function args. I.e. e for events.
        ]
    },
    'env': {
        'browser': true,
        'jquery':true
    },
    'extends': 'eslint:recommended'
};
