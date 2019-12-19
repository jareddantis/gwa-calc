const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');

module.exports = {
  devServer: {
    compress: true,
    http2: true,
    https: {
      key: fs.readFileSync('./ssl/localhost.key'),
      cert: fs.readFileSync('./ssl/localhost.crt'),
      ca: fs.readFileSync('./ssl/ca.pem'),
    },
  },

  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.(js|ts|tsx)$/,
          loader: 'babel-loader',
          exclude: [ path.resolve(__dirname, '../node_modules/qr-scanner/qr-scanner-worker.min.js') ],
        },
        {
          test: /qr-scanner-worker\.min\.js$/,
          loader: 'file-loader',
        },
      ],
    },

    plugins: [
      new VuetifyLoaderPlugin(),

      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../src/index.html'),
        title: 'GWA Calc',
      }),
    ],

    resolve: {
      alias: {
        '~': 'node_modules/',
      },
    },
  },

  parallel: true,
  publicPath: '/',
};
