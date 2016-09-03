const path = require('path');
const merge = require('webpack-merge');

module.exports = (env = { prod: false, debug: false, port: 8080, host: 'localhost' }) => {

    const parts = require('../../webpack/appParts')(__dirname, env);

    return merge(
        parts.asAppBundle(),
        {
            entry: {
                'vendor-styles': path.join(__dirname, 'src', 'shared', 'vendor-styles.js')
            }
        },
        parts.es6(),
        parts.sass(),
        parts.inlineImages(),
        parts.inlineHtmlTemplates(),
        parts.inlineNgTableHtmlTemplates(),
        parts.useHtmlPlugin(),
        parts.forEnvironment()
    );
}