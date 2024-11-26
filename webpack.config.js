const path = require('path');
const PugPlugin = require('pug-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Correct import

module.exports = {
    mode: 'development',
    // other configurations...

    resolve: {
        alias: {
            Images: path.join(__dirname, 'public/images/'),
            Pug: path.join(__dirname, 'public/views/'),
            Sass: path.join(__dirname, 'public/sass/'),
            JS: path.join(__dirname, 'public/js/'),
            Json: path.join(__dirname, 'public/json/'),
        },
    },

    output: {
        path: path.join(__dirname, 'Release/'),
    },

    plugins: [
        new PugPlugin({
            // automatically processing all templates in the path
            entry: 'public/views/',
            // - OR - define many pages manually (key is output filename w/o `.html`)
            //entry: {
            // simple page config w/o variables
            //index: 'src/views/index.pug', // => dist/index.html
            // advanced page config with variables
            //},

            js: {
                // JS output filename, used if `inline` option is false (defaults)
                filename: 'js/[name].[contenthash:8].js',
                //inline: true, // inlines JS into HTML
            },
            css: {
                // CSS output filename, used if `inline` option is false (defaults)
                filename: 'css/[name].[contenthash:8].css',
                //inline: true, // inlines CSS into HTML
            },
        })
        // new HtmlWebpackPlugin({
        //     template: './public/views/index.pug',  // Your Pug template file
        //     filename: 'index.html',
        // }),
    ],

    module: {
        rules: [
            {
                test: /\.(html)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            // The `mimetype` and `encoding` arguments will be obtained from your options
                            // The `resourcePath` argument is path to file.
                            generator: (content, mimetype, encoding, resourcePath) => {
                                if (/\.html$/i.test(resourcePath)) {
                                    return `data:${mimetype},${content.toString()}`;
                                }
                                return `data:${mimetype}${
                                    encoding ? `;${encoding}` : ''
                                },${content.toString(encoding)}`;
                            },
                        },
                    },
                ],
            },

            {
                test: /\.(s?css|sass)$/,
                use: ['css-loader', 'sass-loader']
            },

            {
                test: /\.(ico|png|jp?g|webp|svg)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'img/[name].[hash:8][ext][query]',
                },
            },
            {
                test: /\.json$/,
                type: 'json', // Webpack handles JSON natively
            }
        ],
    },
    devServer: {
        static: path.join(__dirname, 'dist'),  // Replace contentBase with static
        hot: true,  // Enable HMR
        open: true, // Automatically open the browser
        port: 3010, // Port for the dev server
    },
};