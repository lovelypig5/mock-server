module.exports = (modulePath) => {

    var path = require('path');
    const webpack = require(`${modulePath}/webpack`);
    const HtmlWebpackPlugin = require(`${modulePath}/html-webpack-plugin`);
    const WebpackChunkHash = require(`${modulePath}/webpack-chunk-hash`);
    // extract the manifest to a separate JSON file
    const ChunkManifestPlugin = require(`${modulePath}/chunk-manifest-webpack-plugin`);
    // inject manifest.json to index.html
    const InlineChunkManifestHtmlWebpackPlugin = require(`${modulePath}/inline-chunk-manifest-html-webpack-plugin`);

    return {
        // if single entry is used, bundle name will be named as main.js
        entry: {
            admin: "./views/admin",
            index: './views/index',
            common: [
                'jquery',
                'vue',
                'vuex',
                'vue-router',
                'js-cookie',
                'bootstrap'
            ],
            commoncss: ['bootstrap/dist/css/bootstrap.min.css', 'bootstrap/dist/css/bootstrap-theme.min.css', 'animate.css', 'font-awesome/css/font-awesome.min.css']
        },
        output: {
            publicPath: '/'
        },
        // plugins example, default no more
        plugins: [
            new webpack.ProvidePlugin({Vue: 'vue', $: "jquery", jQuery: "jquery"}),
            new HtmlWebpackPlugin({
                template: './views/admin.tpl',
                filename: './admin.html',
                chunks: ['manifest', 'admin', 'common', 'commoncss']
            }),
            new HtmlWebpackPlugin({
                template: './views/index.tpl',
                filename: './index.html',
                chunks: ['manifest', 'index', 'common', 'commoncss']
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: ["commoncss", "common", "manifest"]
            }),
            new webpack.HashedModuleIdsPlugin(),
            new WebpackChunkHash(),
            new ChunkManifestPlugin(),
            new InlineChunkManifestHtmlWebpackPlugin()
        ],
        module: {
            rules: []
        },
        resolve: {
            alias: {
                templates: path.resolve("./templates"),
                config: path.resolve("./js/config"),
                css: path.resolve("./css"),
                less: path.resolve("./less"),
                js: path.resolve("./js"),
                vue: 'vue/dist/vue.common.js',
                'vue-router': 'vue-router/dist/vue-router.common.js'
            }
        },
        externals: [],
        devServer: {
            proxy: {
                '*': 'http://localhost:3003'
            }
        }
    };
};
