const fs = require('fs');
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
          test: /\.(css|styl)$/,
          use: ['vue-style-loader'],
        },
      ],
    },

    plugins: [
      new VuetifyLoaderPlugin(),
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
