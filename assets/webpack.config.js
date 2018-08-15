module.exports = (modulePath) => {

    var path = require('path');
    const webpack = require(`${modulePath}/webpack`);
    const HtmlWebpackPlugin = require(`${modulePath}/html-webpack-plugin`);
    const WebpackChunkHash = require(`${modulePath}/webpack-chunk-hash`);

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
                chunks: ['admin', 'common', 'commoncss']
            }),
            new HtmlWebpackPlugin({
                template: './views/index.tpl',
                filename: './index.html',
                chunks: ['index', 'common', 'commoncss']
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: ["commoncss", "runtime", "common"]
            }),
            new webpack.HashedModuleIdsPlugin(),
            new WebpackChunkHash()
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
