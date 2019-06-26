const { DefinePlugin } = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');

module.exports = {
  configureWebpack: {
    optimization: {
      minimizer: [
        new OptimizeCSSPlugin(),
        new TerserPlugin({ parallel: true }),
      ],
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendors: {
            name: 'vendor',
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all',
            enforce: true,
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
          test: /\.css$/,
          use: [
            MiniCSSExtractPlugin.loader,
            'css-loader',
          ],
        },
        {
          test: /\.styl$/,
          use: [
            MiniCSSExtractPlugin.loader,
            'stylus-loader',
          ],
        },
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

      new BundleAnalyzerPlugin({
        analyzerMode: 'disabled',
        openAnalyzer: false,
        generateStatsFile: true
      }),
      new MiniCSSExtractPlugin({
        filename: 'style.css',
      }),
      new PreloadWebpackPlugin(),
    ],

    resolve: {
      alias: {
        '~': 'node_modules/',
      },
    },
  },

  parallel: true,
  productionSourceMap: false,
  publicPath: '/gwa-calc/',

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
