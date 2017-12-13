const path = require('path');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const PATHS = {
  build: path.resolve(__dirname, 'public/bundles'),
  src: path.resolve(__dirname, 'src'),
};

const extractTextPluginConfig = new ExtractTextPlugin('[name].css');

const baseConfig = {
  devtool: 'source-map',
  context: path.join(process.cwd()),
  entry: {
    popup: path.join(PATHS.src, 'popup.js'),
    background: path.join(PATHS.src, 'background.js'),
  },
  output: {
    path: PATHS.build,
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [PATHS.src],
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: extractTextPluginConfig.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'sass-loader',
          ],
        }),
      },
    ],
  },
  plugins: [
    extractTextPluginConfig,
  ],
};

const envConfig = new Proxy({
  dev: {},
  dist: {},
}, {
  // Proxy will force dev configuration to be returned
  // if no matching environment found
  get(target, name) {
    if (target[name]) {
      return target[name];
    }
    return target.dev;
  },
});

module.exports = env => merge(baseConfig, envConfig[env]);
