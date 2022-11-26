const webpack = require("webpack");
const glob = require("glob");
const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const { PurgeCSSPlugin } = require("purgecss-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  module: {
    rules: [
      {
        test: /.js/,
        exclude: /node_modules/,
        use: [
          {
            loader: "console-drop-loader",
            options: {
              name: "删除console的loader"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      // 定义环境变量
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
      chunkFilename: "[id].[contenthash].css"
    }),
    // 分析bundle内容、大小、模块间的关系
    new BundleAnalyzerPlugin({
      analyzerMode: "disabled", // 不启动生成报告的http服务器
      generateStatsFile: true // 是否生成stats.json文件，会在目录下生成stats.json,可以设置为false来规避
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [
      // 压缩css
      new CssMinimizerPlugin(),
      // TODO:对css进行treeshaking
      // 目前treeshaking忽略*.vue文件时，sass-loader会报错，待修复
      new PurgeCSSPlugin({
        paths: glob.sync(`${path.join(__dirname, "../src")}/**/*`, {
          nodir: true
        })
      }),
      // 压缩js (清除debugger\console;支持ES6语法)
      // terserPlugin 配置官网=>https://webpack.docschina.org/plugins/terser-webpack-plugin/
      new TerserPlugin({
        test: /\.js(\?.*)?$/i
      })
    ]
  }
});
