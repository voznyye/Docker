'use strict';

let path = require("path");

module.exports = {
  mode: 'development',
  entry: {
    config: './clients/scripts/config.js',
    scripts: './clients/scripts/script.js',
    signIN: './clients/scripts/registration/sign-in.js',
    signUP: './clients/scripts/registration/sign-up.js',
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/clients/build'
  },
  watch: true,

  devtool: "source-map",

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', {
                debug: true,
                corejs: 3,
                useBuiltIns: "usage"
            }]]
          }
        }
      }
    ]
  }
};
