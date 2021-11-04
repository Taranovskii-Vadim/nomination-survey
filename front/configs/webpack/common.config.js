const { merge } = require("webpack-merge");

const devServerConfig = require("./dev.config");

const getCommonConfig = (mode) => {
  const isDevelopment = mode === "development";
  const isAnalyzerOpen = process.env.OPEN_BUNDLE;

  return {};
};

module.exports = (env, { mode }) => {
  const config = getCommonConfig(mode);

  if (mode === "development") {
    return merge(devServerConfig, config);
  }

  return config;
};
