const path = require('path');
const fs = require('fs');
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');

function resolve (dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  devServer: {
    https: {
      cert: fs.readFileSync('./ssl/localhost.crt'),
      key: fs.readFileSync('./ssl/localhost.key'),
      ca: fs.readFileSync('./ssl/ca.pem'),
    },
  },
  chainWebpack: (config) => {
    config.resolve.alias.set('~', resolve('node_modules/'));
  },
  configureWebpack: {
    plugins: [
      new VuetifyLoaderPlugin()
    ]
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/gwa-calc/'
    : '/'
};
