const path = require("path");
const { config } = require("dotenv");
const { merge } = require("webpack-merge");
const { DefinePlugin } = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

config();

const MAIN_CHUNK = "main";
const PREFIX = process.env.PREFIX || "/";
const ROOT = path.resolve(__dirname, "..", "..");

const devServerConfig = require("./dev.config");

const getCommonConfig = (mode) => {
  const isDevelopment = mode === "development";
  const isAnalyzerOpen = !!process.env.OPEN_BUNDLE;

  const ifProduction = (plugin) => (!isDevelopment ? plugin : null);

  return {
    entry: {
      [MAIN_CHUNK]: ["@babel/polyfill", "./src/index.tsx"],
    },
    output: {
      filename: isDevelopment ? "[name].js" : "[name].[hash].js",
      path: path.resolve(ROOT, "build"),
      // TODO can include chunk names here
      publicPath: PREFIX,
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".json"],
      alias: {
        src: path.resolve(ROOT, "src"),
      },
    },
    optimization: {
      splitChunks: {
        chunks: "all",
      },
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
            },
          ],
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: "style-loader",
            },
            {
              loader: "css-loader",
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(ROOT, "public", "index.html"),
        chunks: [MAIN_CHUNK],
      }),
      new DefinePlugin({
        "process.env.PREFIX": JSON.stringify(PREFIX),
      }),
      ifProduction(
        new BundleAnalyzerPlugin({
          analyzerMode: "static",
          reportFilename: "buildMap.html",
          openAnalyzer: isAnalyzerOpen,
        })
      ),
    ].filter(Boolean),
  };
};

module.exports = (env, { mode }) => {
  const config = getCommonConfig(mode);

  if (mode === "development") {
    return merge(devServerConfig, config);
  }

  return config;
};
