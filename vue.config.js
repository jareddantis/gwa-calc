const fs = require('fs');
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');

function getPlugins(mode) {
  if (mode === 'production') {
    return [
      new VuetifyLoaderPlugin(),
      new BundleAnalyzerPlugin({
        analyzerMode: 'disabled',
        openAnalyzer: false,
        generateStatsFile: true
      }),
      new MiniCSSExtractPlugin({
        filename: '[name].css',
      }),
      new PreloadWebpackPlugin(),
    ]
  } else {
    return [
      new VuetifyLoaderPlugin(),
      new BundleAnalyzerPlugin(),
    ]
  }
}

module.exports = {
  devServer: process.env.NODE_ENV === 'development' ? {
    compress: true,
    http2: true,
    https: {
      key: fs.readFileSync('./ssl/localhost.key'),
      cert: fs.readFileSync('./ssl/localhost.crt'),
      ca: fs.readFileSync('./ssl/ca.pem'),
    },
  } : {},
  configureWebpack: {
    optimization: process.env.NODE_ENV === 'production' ? {
      minimizer: [
        new OptimizeCSSPlugin(),
        new TerserPlugin({ parallel: true }),
      ],
      splitChunks: {
        cacheGroups: {
          vendors: {
            name: 'vendor',
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all',
          },
          styles: {
            name: 'styles',
            test: /\.css$/,
            chunks: 'all',
            enforce: true,
          },
        },
      },
    } : {},
    plugins: getPlugins(process.env.NODE_ENV),
    module: process.env.NODE_ENV === 'production' ? {
      rules: [
        {
          test: /\.css$/,
          use: [MiniCSSExtractPlugin.loader, 'css-loader'],
        },
      ],
    } : {},
    resolve: {
      alias: {
        '~': 'node_modules/',
      },
    },
  },
  parallel: true,
  productionSourceMap: false,
  publicPath: process.env.NODE_ENV === 'production' ? '/gwa-calc/' : '/',
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
