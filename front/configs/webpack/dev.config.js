'use strict';

module.exports = {
  devServer: {
    historyApiFallback: true,
    port: 3000,
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
};
