'use strict';

const getConfig = () => {
  return {
    presets: ['@babel/preset-env', '@babel/preset-typescript', '@babel/preset-react'],
  };
};

module.exports = (api) => {
  const config = getConfig();

  api.cache.forever();

  return config;
};
