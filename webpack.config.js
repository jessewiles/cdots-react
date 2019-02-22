const HtmlWebPackPlugin = require("html-webpack-plugin"),
      path = require('path'),
      BUILD_DIR = path.resolve(__dirname, 'public'),
      APP_DIR = path.resolve(__dirname, 'src', 'js');

var config = {
    entry: APP_DIR + '/index.js',
    output: {
        path: BUILD_DIR,
        filename: 'app.js'
    },
    module : {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            }
        ]
    },
    /*plugins: [
        new HtmlWebPackPlugin({
            template: "./src/js/index.html",
            filename: BUILD_DIR + "/index.html2"
        })
    ]*/
};

module.exports = config;
