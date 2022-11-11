const webpack = require("webpack");
const {merge} = require("webpack-merge");
const common = require("./webpack.common");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = merge(common,{
    mode:"production",
    module:{
        rules:[
            {
                test:/.js/,
                exclude: /node_modules/,
                use:[
                    {
                        loader:"console-drop-loader",
                        options:{
                            name:"删除console的loader"
                        }
                    }
                ]
            },
        ]
    },
    plugins:[
        new webpack.DefinePlugin({ // 定义环境变量
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new MiniCssExtractPlugin({
            filename:"[name].[contenthash].css",
            chunkFilename: "[id].[contenthash].css",
        }),
    ],
    optimization:{
        minimize: true,
        minimizer: [
            // 压缩css
            new CssMinimizerPlugin(),
            // 压缩js (清除debugger\console;支持ES6语法)
            // terserPlugin 配置官网=>https://webpack.docschina.org/plugins/terser-webpack-plugin/
            new TerserPlugin({ 
                test: /\.js(\?.*)?$/i
            }),
        ]
    }
});