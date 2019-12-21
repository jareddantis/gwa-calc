const path = require('path');
const glob = require('glob-all');

module.exports = (ctx) => ({
  plugins: {
    'autoprefixer': true,
    '@fullhuman/postcss-purgecss': ctx.env === 'production' ? {
      content: glob.sync([
        path.join(__dirname, './src/**/*.vue'),
        path.join(__dirname, './node_modules/vuetify/src/**/*.ts'),
      ]),
      whitelist: [
        'body', 'html', 'col-4', 'col-12',
      ],
      whitelistPatterns: [
        /transition$/,
        /-(leave|enter|appear)(|-(to|from|active))$/,
        /^router-link(|-exact)-active$/,
      ],
    } : false,
    'cssnano': ctx.env === 'production' ? {
      preset: [
        'default',
        {
          discardComments: {
            removeAll: true,
          },
        }
      ],
    } : false,
  }
});
