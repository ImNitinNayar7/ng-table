const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');

module.exports = createAppParts;

function createAppParts(rootDir, env = {}) {
    const commonParts = require('./parts')(rootDir, env);
    const pkg = require(path.join(rootDir, 'package'));

    let PATHS = {
        build: path.join(rootDir, 'build'),
        source: path.join(rootDir, 'src')
    };    

    return Object.assign({}, commonParts, {
        asAppBundle,
        inlineImages,
        inlineHtmlTemplates,
        inlineNgTableHtmlTemplates,
        sass,
        useHtmlPlugin
    });

    /////


    function asAppBundle() {
        const isNodeModule = new RegExp('node_modules');

        const common = merge(
            {
                entry: {
                    main: path.join(PATHS.source, 'main.js')
                },
                output: {
                    path: PATHS.build,
                    filename: '[name].[chunkhash].js',
                    // This is used for require.ensure if/when we want to use it
                    chunkFilename: '[chunkhash].js'
                },
                plugins: [
                    // include node_modules requested in a seperate bundle
                    new webpack.optimize.CommonsChunkPlugin({
                        name: 'vendor',
                        minChunks: module => isNodeModule.test(module.resource)
                    }),
                    // extract webpack manifest file into it's own chunk to ensure vendor hash does not change 
                    // (as per solution discussed here https://github.com/webpack/webpack/issues/1315)
                    new webpack.optimize.CommonsChunkPlugin({
                        name: 'manifest',
                        minChunks: Infinity
                    })
                ]
            },
            devServer()
        );

        if (commonParts.isDevServer) {
            return merge(
                common,
                {
                    output: {
                        // ensure urls in css work in conjunction with source maps
                        // this is required because of the limitation of style-loader
                        // (see https://github.com/webpack/style-loader#recommended-configuration)
                        publicPath: 'http://localhost:8080'
                    }
                }//,
                // hot module reload not working; wanted it for the css :-(
                // hmr()
            );
        } else {
            // note: we can't configure webpack to use root relative paths (ie publicPath: '/') as this limits
            // site deployment to always the root of that website; in IIS for example it's common to use
            // a subdirectory as the root folder for the web app
            return common;
        }
    }

    function devServer() {
        return {
            devServer: {
                inline: true,
                // Parse host and port from env to allow customization.
                //
                // If you use Vagrant or Cloud9, set
                // host: options.host || '0.0.0.0';
                //
                // 0.0.0.0 is available to all network devices
                // unlike default `localhost`.
                host: env.host, // Defaults to `localhost`
                port: env.port, // Defaults to 8080
                contentBase: 'build/',
                historyApiFallback: true,
                stats: 'errors-only' // none (or false), errors-only, minimal, normal (or true) and verbose
            }
        };
    }


    function useHtmlPlugin() {
        var HtmlWebpackPlugin = require('html-webpack-plugin');
        return {
            plugins: [new HtmlWebpackPlugin({
                template: path.join(rootDir, 'index.tpl.html')
            })]
        }
    }

    function inlineImages(sizeLimit = 1024) {
        return {
            module: {
                loaders: [
                    {
                        test: /\.(jpg|png)$/,
                        loader: `url?limit=${sizeLimit}&name=[path][name]-[hash].[ext]`,
                        exclude: /node_modules/
                    }
                ]
            }
        }
    }

    function inlineHtmlTemplates() {
        return {
            module: {
                loaders: [
                    {
                        test: /\.html$/,
                        loaders: ['ngtemplate?requireAngular&relativeTo=/src/&prefix=demo-app/', 'html'],
                        include: [
                            path.resolve(rootDir, 'src')
                        ],
                        exclude: [path.join(rootDir, 'index.tpl.html')]
                    }
                ]
            }
        };
    }

    function inlineNgTableHtmlTemplates() {
        return {
            module: {
                loaders: [
                    {
                        test: /ng-table[\/\\]src[\/\\].*\.html$/,
                        loaders: ['ngtemplate?requireAngular&relativeTo=/src/browser/&prefix=ng-table/', 'html']
                    }
                ]
            }
        };
    }

    function sass() {
        const isDevServer = process.argv.find(v => v.indexOf('webpack-dev-server') !== -1);

        // note: would like to use sourcemaps in a deployed website (ie outside of dev-server)
        // but these do not work with relative paths (see the asAppBundle ouput options 
        // in this file for more details)
        let loaders;
        if ((env.debug || env.prod) && isDevServer) {
            loaders = 'style!css?sourceMap!resolve-url!sass?sourceMap';
        } else {
            // note: the 
            loaders = 'style!css!resolve-url!sass?sourceMap';
        }
        return {
            module: {
                loaders: [
                    {
                        test: /\.scss$/,
                        loaders: loaders,
                        exclude: /node_modules/
                    }
                ]
            }
        };
    }
}
