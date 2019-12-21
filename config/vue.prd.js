const glob = require('glob');
const path = require('path');
const { DefinePlugin, HashedModuleIdsPlugin } = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HTMLInlineCSSWebpackPlugin = require('html-inline-css-webpack-plugin').default;
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');

module.exports = {
  configureWebpack: {
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: '[name].[contenthash:8].js',
    },

    optimization: {
      minimizer: [
        new OptimizeCSSPlugin(),
        new TerserPlugin({ parallel: true }),
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
            test: /\.(c|s[ac])ss$/,
            chunks: 'all',
            enforce: true,
          },
        },
      },
    },

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
        {
          test: /\.css$/,
          use: [
            MiniCSSExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
          ]
        }
      ],
    },

    plugins: [
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

      new HashedModuleIdsPlugin(),
      new VuetifyLoaderPlugin(),

      // PurgeCSS
      new PurgecssPlugin({
        paths: glob.sync(path.join(__dirname, '../node_modules/vuetify/src/**/*.ts')).filter((f) => !/\/$/.test(f)),
        whitelist: ['html', 'body'],
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
          'twitter:image': '/favicon/android-chrome-512x512.png',

          // PWA
          'msapplication-TileColor': '#212121',
          'msapplication-config': '/favicon/browserconfig.xml',
          'theme-color': '#212121',
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

      // Inline Vuetify CSS
      new HTMLInlineCSSWebpackPlugin({
        filter: (filename) => filename.includes('vuetify'),
      }),

      // CSS preloading
      new PreloadWebpackPlugin(),

      new BundleAnalyzerPlugin({
        analyzerMode: 'disabled',
        openAnalyzer: false,
        generateStatsFile: true
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
