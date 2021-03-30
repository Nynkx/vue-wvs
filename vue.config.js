const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  transpileDependencies: ["vuetify"],
  chainWebpack:
    /**
     * @param {chainWebpack} config
     */
    function(config) {
      config
        .entry("adaptive")
        .add(path.resolve("src/foxit-lib/adaptive.js"))
        .end()
        .entry("preload")
        .add(path.resolve("src/preload.js"))
        .end()
        .plugin("html")
        .tap((args) => {
          const [options] = args;
          options.chunks = ["adaptive", "preload", "chunk-vendors", "app"];
          options.chunksSortMode = "manual";
          options.title = "WVS2-DMS";
          return args;
        })
        .end()
        .module.rule("js")
        .exclude.add(/node_modules|foxit-lib|license\-key\.js/);

      config.module
        .rule("eslint")
        .exclude.add(/node_modules|foxit-lib|license\-key\.js/);

      config.module
        .rule("addon")
        .type("javascript/auto")
        .include.add(/foxit-lib/)
        .end()
        .test(/\addon\.info\.json$/)
        .use("babel")
        .loader("babel-loader")
        .options({
          presets: ["@babel/env"],
        })
        .end()
        .use("addon-loader")
        .loader("@foxitsoftware/addon-loader")
        .end();

      config.externals(["UIExtension", "PDFViewCtrl"]);

      const svgRule = config.module.rule("svg");

      svgRule.uses.clear();

      svgRule
        .use("babel-loader")
        .loader("babel-loader")
        .end()
        .use("vue-svg-loader")
        .loader("vue-svg-loader");
    },
  configureWebpack: {
    plugins: [
      new CopyWebpackPlugin([
        {
          from: "src/foxit-lib/",
          to: "foxit-lib",
          force: true,
          ignore: [
            "{PDFViewCtrl,UIExtension}*.{js,css}",
            "preload-jr-worker.js",
          ],
        },
      ]),
    ],
  },
  lintOnSave: false,
  devServer: {
    disableHostCheck: true,
    historyApiFallback: true,
    https: true,
    // proxy: "https://192.168.0.115",
    proxy: "https://116.193.68.82",
  },
  publicPath: process.env.NODE_ENV === "production" ? "" : "/",
  outputDir: "./server/public",
};
