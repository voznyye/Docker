'use strict';

let path = require("path");

// TODO
// 1 Вынести минификацию css сюда

module.exports = {
  mode: 'development',
  entry: {
    config: './clients/scripts/config.js',
    scripts: './clients/scripts/script.js',
    signIN: './clients/scripts/registration/sign-in.js',
    signUP: './clients/scripts/registration/sign-up.js',
    products: './clients/scripts/products/products.js',
    admin: './clients/scripts/admin.js',
    pay: './clients/scripts/pay.js'
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
  // module: {
  //   rules: [
  //     {
  //       test: /\.css$/i,
  //       loader: "css-loader",
  //       options: {
  //         url: {
  //           filter: (url, resourcePath) => {
  //             // resourcePath - path to css file

  //             // Don't handle `img.png` urls
  //             if (url.includes("img.png")) {
  //               return false;
  //             }

  //             // Don't handle images under root-relative /external_images/
  //             if (/^\/external_images\//.test(path)) {
  //               return false;
  //             }

  //             return true;
  //           },
  //         },
  //       },
  //     },
  //   ],
  // },
  

};
