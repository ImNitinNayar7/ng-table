const path = require('path');
const merge = require('webpack-merge');

module.exports = (env = { prod: false, debug: false, port: 8080, host: 'localhost' }) => {

    const parts = require('../../webpack/appParts')(__dirname, env);

    return merge(
        parts.asAppBundle(),
        parts.es6(),
        parts.sass(),
        parts.inlineImages(),
        parts.inlineHtmlTemplates(),
        parts.inlineNgTableHtmlTemplates(),
        parts.useHtmlPlugin(),
        parts.forEnvironment()
    );
}