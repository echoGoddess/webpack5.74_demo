const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
// const WorkboxWebpackPlugin = require("workbox-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");

// const MyPlugin = require("../src/plugins/FileListPlugin");
const env = process.env.NODE_ENV;

module.exports = {
  entry: {
    index: "./src/index.js"
    // print:"./src/print.js"
  },
  output: {
    filename: "[name].[chunkhash].js",
    path: path.resolve(__dirname, "../dist")
    // publicPath:"/" // 资源被引用的根路径,仅作用于线上
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: "vue-loader",
        exclude: /node_modules/
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.s[ac]ss$/,
        exclude: /node_modules/,
        use: [
          // 开发环境使用vue-style-loader，实现样式热更新
          // 生产环境使用minCssExtractPlugin，分割出css
          env === "production"
            ? MiniCssExtractPlugin.loader
            : "vue-style-loader",
          // "custom-style-loader",
          "css-loader", // css编译成commonJS模块
          "postcss-loader", // 添加浏览器前缀
          "sass-loader" // sass编译成css
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        type: "asset",
        exclude: /node_modules/,
        generator: {
          filename: "static/images/[hash][ext][query]"
        },
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024 // 4kb ,当小于该临界值时，使用url-loader,否则使用file-loader编译
          }
        },
        use: [
          {
            loader: "image-webpack-loader", // 压缩图片
            options: {
              mozjpeg: {
                progressive: true
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4
              },
              gifsicle: {
                interlaced: false
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75
              }
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        // 将引入的字体文件路径打包到dist中，功能相当于file-loader
        type: "asset/resource",
        generator: {
          filename: "static/fonts/[name][ext][query]"
        }
      }
    ]
  },
  // 自定义loader
  resolveLoader: {
    alias: {
      "console-drop-loader": path.resolve(
        __dirname,
        "../src/loader/drop-console.js"
      )
      // "custom-style-loader":path.resolve(__dirname,"../src/loader/style-loader.js")
    }
  },
  // 打包前清除dist包，这样每次dist包都是最新的
  plugins: [
    // new MyPlugin({
    //     title:"custom-plugin"
    // }),
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    // 分析bundle内容、大小、模块间的关系
    new BundleAnalyzerPlugin({
      analyzerMode: "disabled", // 不启动生成报告的http服务器
      generateStatsFile: true // 是否生成stats.json文件，但是会在目录下生成stats.json,可以设置为false来规避
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../src/template.html"),
      title: "webpackDemo"
    })
    // 离线应用程序
    // new WorkboxWebpackPlugin.GenerateSW({
    //     clientsClaim:true,
    //     skipWaiting:true
    // })
  ],
  optimization: {
    splitChunks: {
      // 分割代码，单独打包
      minSize: 0, // 单个模块大小超过该值时，进行分割 KB TODO:暂时设置为0
      cacheGroups: {
        // 缓存组
        commons: {
          chunks: "initial", // 将什么类型的代码块用于分割，三选一： "initial"：入口代码块 | "all"：全部 | "async"：按需加载的代码块
          minChunks: 2, // 一个模块最小被2个模块引用，才需要提出来成为单独的模块
          maxInitialRequests: 5 // 初始化页面时，最大可并行请求5个模块
        },
        vendors: {
          // 提取公共模块
          test: /node_modules/,
          chunks: "initial",
          name: "vendor"
        }
      }
    }
  }
};
