const chalk = require("chalk");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const WorkboxWebpackPlugin = require("workbox-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");

// const MyPlugin = require("../src/plugins/FileListPlugin");

const env = process.env.NODE_ENV;

module.exports = {
  entry: {
    index: "./src/index.js"
    // print:"./src/print.js"
  },
  output: {
    filename: "[name].[chunkhash].js",
    path: path.resolve(__dirname, "../dist"),
    pathinfo: false // bundle中不输出路径
    // publicPath:"/" // 资源被引用的根路径,仅作用于线上
  },
  // 不需要打包的第三方模块
  // 不需要更新版本的模块：如lodash
  externals: {
    // _: "lodash"
  },
  // 配置解析模块规则
  resolve: {
    // 配置解析模块别名
    alias: {
      "@": path.resolve(__dirname, "../src")
    },
    // 配置省略文件路径的后缀名
    extensions: [".js", ".vue", ".json", ".scss"],
    // 配置webpack解析模块去哪个目录找
    modules: [
      path.resolve(__dirname, "../node_modules"),
      path.resolve(__dirname, "./src")
    ],
    // todo:啥意思
    symlinks: false
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            // 让耗时的postcss-loader，在独立的线程池中运行
            // 其开销大约为 600ms 左右,所以只在耗时的操作中使用此loader
            loader: "thread-loader",
            options: {
              workerParallelJobs: 2
            }
          },
          "vue-loader"
        ],
        exclude: /node_modules/,
        include: path.resolve(__dirname, "../src")
      },
      {
        // 普通的 `.scss` 文件和 `*.vue` 文件中的
        // `<style lang="scss">` 块都应用它
        test: /\.s[ac]ss$/,
        include: path.resolve(__dirname, "../src"),
        exclude: /node_modules/,
        use: [
          // 开发环境使用vue-style-loader，实现样式热更新
          // 生产环境使用minCssExtractPlugin，分割出css
          env === "production"
            ? MiniCssExtractPlugin.loader
            : "vue-style-loader",
          // "custom-style-loader",
          {
            loader: "css-loader"
          },
          {
            // 让耗时的postcss-loader，在独立的线程池中运行
            // 其开销大约为 600ms 左右,所以只在耗时的操作中使用此loader
            loader: "thread-loader",
            options: {
              workerParallelJobs: 2
            }
          },
          "postcss-loader", // 添加浏览器前缀
          {
            // TODO:让耗时的postcss-loader，在独立的线程池中运行
            // 其开销大约为 600ms 左右,所以只在耗时的操作中使用此loader
            loader: "thread-loader",
            options: {
              workerParallelJobs: 2
            }
          },
          "sass-loader" // sass编译成css
        ]
      },
      {
        test: /\.css$/i,
        use: [
          env === "production" ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
          {
            // 让耗时的postcss-loader，在独立的线程池中运行
            // 其开销大约为 600ms 左右,所以只在耗时的操作中使用此loader
            loader: "thread-loader",
            options: {
              workerParallelJobs: 2
            }
          },
          "postcss-loader" // 添加浏览器前缀
        ]
      },
      {
        test: /\.m?js$/,
        // include: path.resolve(__dirname, "../src"),
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        type: "asset",
        include: path.resolve(__dirname, "../src"),
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
        include: path.resolve(__dirname, "../src"),
        exclude: /node_modules/,
        // 将引入的字体文件路径打包到dist中，功能相当于file-loader
        // TODO:字体文件体积过大，可以提取常用字体并异步加载，或者使用CDN
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
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../src/template.html"),
      title: "webpackDemo"
    }),
    // 自动按需引入element-plus组件
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    }),
    // 进度条
    new ProgressBarPlugin({
      format: `  :msg [:bar] ${chalk.green.bold(":percent")} (:elapsed s)`
    })
    // 离线应用程序
    // new WorkboxWebpackPlugin.GenerateSW({
    //     clientsClaim:true,
    //     skipWaiting:true
    // })
  ],
  optimization: {
    // TODO:待优化
    splitChunks: {
      // 分割代码，单独打包
      minSize: 20000, // 单个模块大小超过该值时，进行分割 bytes
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
          chunks: "initial"
          // name: "vendor"
        }
      }
    }
  }
};
