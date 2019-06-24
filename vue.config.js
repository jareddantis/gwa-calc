const path = require('path');
const fs = require('fs');
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');
const BundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

function resolve (dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  chainWebpack: (config) => {
    config.resolve.alias.set('~', resolve('node_modules/'));
  },
  configureWebpack: {
    plugins: [
      new VuetifyLoaderPlugin(),
      new BundleAnalyzer()
    ]
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/gwa-calc/'
    : '/',
  pwa: {
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/service-worker.js',
      exclude: [
        /\.map$/,
        /manifest\.json$/
      ],
    },
  },
};
