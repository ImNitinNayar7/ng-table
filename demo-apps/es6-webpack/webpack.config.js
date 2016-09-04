const path = require('path');
const merge = require('webpack-merge');

module.exports = (env = { prod: false, debug: false, port: 8080, host: 'localhost' }) => {

    const parts = require('../../webpack/appParts')(__dirname, env);

    const vendorStyles = {
        entry: {
            'vendor-styles': path.join(__dirname, 'src', 'shared', 'vendor-styles.scss')
        }
    };

    return merge(
        parts.asAppBundle(),
        parts.isDevServer ? merge(vendorStyles, parts.sass()) : parts.extractSassChunks(vendorStyles.entry),
        parts.es6(),
        parts.inlineImages(),
        parts.inlineHtmlTemplates(),
        parts.inlineNgTableHtmlTemplates(),
        parts.useHtmlPlugin(),
        parts.forEnvironment()
    );
}