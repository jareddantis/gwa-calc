const path = require('path');
const { DefinePlugin, HashedModuleIdsPlugin } = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const PrerenderSPAPlugin = require('prerender-spa-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');

const publicPath = '/gwa-calc';

module.exports = {
  configureWebpack: {
    devtool: '#cheap-source-map',

    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: '[name].[contenthash:8].js',
    },

    optimization: {
      minimizer: [
        new OptimizeCSSPlugin(),
        new TerserPlugin({
          parallel: true,
          sourceMap: true,
        }),
      ],
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all',
            enforce: true,
            name(module) {
              // from https://hackernoon.com/the-100-correct-way-to-split-your-chunks-with-webpack-f8a9df5b7758
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
              return `npm.${packageName.replace('@', '')}`;
            },
          },
          styles: {
            name: 'styles',
            test: /\.(css|styl)$/,
            chunks: 'all',
            enforce: true,
          },
        },
      },
    },

    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          include: [ path.resolve( __dirname, 'src') ]
        },
        {
          test: /\.(js|ts|tsx)$/,
          loader: 'babel-loader',
        },
        {
          test: /\.styl$/,
          loader: 'stylus-loader',
        },
        {
          test: /\.css$/,
          use: [
            MiniCSSExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  require('autoprefixer')(),
                  require('cssnano')({
                    preset: ['default', {
                      discardComments: {
                        removeAll: true,
                      },
                    }],
                  }),
                ]
              }
            }
          ]
        }
      ],
    },

    plugins: [
      new VuetifyLoaderPlugin(),

      // Build date in app
      new DefinePlugin({
        'process.env': {
          BUILD_DATE: (() => {
            const now = new Date();
            const year = now.getFullYear();
            let month = now.getMonth() + 1;
            let day = now.getDate();
            if (month < 10) { month = '0' + month }
            if (day < 10) { day = '0' + day }
            return year.toString() + month + day
          })(),
        },
      }),

      // Generate index.html
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.resolve(__dirname, '../src/index.html'),
        title: 'GWA Calc',
        meta: {
          'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no',
          'charset': 'utf-8',

          // SEO
          'author': 'Jared Dantis',
          'description': 'The quick, responsive general weighted average calculator.',
          'application-name': 'GWA Calc',

          // Twitter card
          'twitter:card': 'summary',
          'twitter:site': '@jareddantis',
          'twitter:title': 'GWA Calc',
          'twitter:description': 'The quick, responsive general weighted average calculator.',
          'twitter:image': `${publicPath}/favicon/android-chrome-512x512.png`,

          // PWA
          'msapplication-TileColor': '#37474F',
          'msapplication-config': `${publicPath}/favicon/browserconfig.xml`,
          'theme-color': '#37474F',
          'apple-mobile-web-app-title': 'GWA Calc',
          'apple-mobile-web-app-capable': 'yes',
          'apple-mobile-web-app-status-bar-style': 'default',
        },
      }),

      // JavaScript loading
      new ScriptExtHtmlWebpackPlugin({
        sync: [ /vue/ ],
        async: [
          /calc/,
          /transmute/,
          /settings/,
        ],
        defaultAttribute: 'defer',
      }),

      // Pre-render HTML
      new PrerenderSPAPlugin({
        staticDir: path.join(__dirname, '../dist'),
        renderer: new PrerenderSPAPlugin.PuppeteerRenderer(),
        routes: [ '/', '/transmute', '/settings' ],
        minify: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          decodeEntities: true,
          keepClosingSlash: true,
          sortAttributes: true,
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true,
        },
      }),

      new BundleAnalyzerPlugin({
        analyzerMode: 'disabled',
        openAnalyzer: false,
        generateStatsFile: true
      }),
      new HashedModuleIdsPlugin(),
    ],

    resolve: {
      alias: {
        '~': 'node_modules/',
      },
    },
  },

  parallel: true,
  productionSourceMap: true,
  publicPath,

  pwa: {
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/service-worker.js',
      exclude: [
        /\.map$/,
        /manifest\.json$/,
        /stats\.json$/
      ],
    },
  },
};
