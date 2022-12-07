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
    index: "./src/index.ts",
    print: "./src/print.ts"
  },
  output: {
    filename:
      env === "production"
        ? "[name].[chunkhash].bundle.js"
        : "[name].bundle.js",
    path: path.resolve(__dirname, "../dist"),
    pathinfo: false, // bundle中不输出路径
    // todo:静态资源放到CDN服务器上
    publicPath: env === "production" ? "https://cdn-server.com/static/" : ""
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
    // 解析目录时要使用的文件名
    // 导入模块时，可省略index文件名
    // mainFields:["index"],
    // 配置省略文件路径的后缀名
    extensions: [".ts", ".vue", ".js", ".tsx", ".json", ".scss"],
    // 配置webpack解析模块去哪个目录找
    modules: [
      path.resolve(__dirname, "../node_modules"),
      path.resolve(__dirname, "./src")
    ],
    // 关闭符号链接
    symlinks: false
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            // 让耗时的vue-loader，在独立的线程池中运行
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
            loader: "css-loader",
            options: {
              esModule: false
            }
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
          "sass-loader" // sass编译成css
        ]
      },
      {
        test: /\.css$/i,
        use: [
          env === "production" ? MiniCssExtractPlugin.loader : "style-loader",
          {
            loader: "css-loader",
            options: {
              // 默认使用ES模块导出,关闭后，使用commonjs模块导出
              esModule: false
            }
          },
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
        test: /\.(ts|js)$/,
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
      imports: ["vue", "vue-router"],
      resolvers: [ElementPlusResolver()],
      dts: "./auto-imports.d.ts",
      eslintrc: {
        enabled: false
      }
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dts: "./components.d.ts",
      eslintrc: {
        enabled: false
      }
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
    // 单独打包runtime的chunk，减小入口chunk的体积(和提取公共模块不兼容)
    // runtimeChunk: true,
    // 指定打包过程中的chunkId，设为named会生成可读性好的chunkId，便于debug
    // chunkIds: "named",
    // 分割代码
    splitChunks: {
      // 单个模块大小超过该值时，进行分割 bytes
      // minSize: 20000,
      // 缓存组
      // 缓存组打包的chunk命名 false:避免对 chunk 进行不必要的命名，以减小打包体积(建议线上环境使用)
      name: false,
      cacheGroups: {
        chunks: "all",
        // 匹配node_modules中使用到的模块
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          // 分割代码方式 "initial"：入口代码块 | "all"：全部 | "async"：按需加载的代码块
          chunks: "all",
          // 优先级-多个缓存组时适用
          priority: 20,
          // 告诉 webpack 忽略 splitChunks.minSize、splitChunks.minChunks、splitChunks.maxAsyncRequests 和 splitChunks.maxInitialRequests 选项
          // 并始终为此缓存组创建 chunk。
          enforce: true
          // 不要给name赋值，
          // 否则会将指定字符串或始终返回相同字符串的函数会将所有常见模块和 vendor 合并为一个 chunk。
          // 这可能会导致更大的初始下载量并减慢页面加载速度
          // name: "vendor"
        },
        // 从入口出发，提取重复模块
        common: {
          chunks: "initial",
          // 一个模块最小被2个模块引用，才需要提出来成为单独的模块
          minChunks: 2,
          // 初始化页面时，最大可并行请求数量
          maxInitialRequests: 6,
          // 当模块同时命中多个缓存组时，分配到优先级高的缓存组
          priority: -20
        }
      }
    }
  }
};
