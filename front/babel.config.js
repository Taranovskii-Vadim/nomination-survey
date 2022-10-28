'use strict';

module.exports = (api) => {
  const isTest = api.env('test');

  const ifTest = (option) => (isTest ? option : null);

  return {
    presets: [
      // In test env we got a regenerator runtime error, because we use Promise in pur code
      // There are two ways to solve it
      // First way is in setupFiles add import 'regenerator-runtime/runtime', of course we need to add this package to our package
      // Second way is using babel-jest (included in jest) package to define in which env we are now, if we are in test env we include targets option.
      // If we are include it for web env, we will get error in IE 11, because option will override browserlistrc logic.
      ['@babel/preset-env', ifTest({ targets: { node: 'current' } })].filter(Boolean),
      '@babel/preset-typescript',
      '@babel/preset-react',
    ],
  };
};
