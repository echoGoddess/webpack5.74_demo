const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map", // 是否和如何生成souce-map,此项的配置会影响dist速度
  // 配置持久化缓存
  cache: {
    type: "filesystem"
  },
  // 添加本地开发服务器,如果启用NODE开启本地服务，此选项将会被忽略
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist") // 指定在dist文件下读取资源
    },
    port: 9000,
    hot: true, // 启用模块热更新
    https: false, // 是否使用https,默认使用http
    open: true, // 服务启动后，默认是否打开浏览器
    proxy: {
      // 代理服务器
      "/api": {
        target: "http://localhost:8080",
        pathRewrite: { "^/api": "/api" },
        secure: false // 是否接受https
      }
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      // 定义环境变量
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    }),
    // 将css样式从bundle中分离出来，打包成一个单独的css
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    // 根据内容而不是根据模块ID来判断是否需要更新模块
    // 在使用该插件热更新css文件时，打包出来的filename必须是[name].css,
    // 因为根据ID的话，文件名是动态的，找不到css文件了
    new webpack.HotModuleReplacementPlugin()
  ]
});
