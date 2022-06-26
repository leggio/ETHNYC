const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets')
    },
    fallback: {
      "stream": require.resolve("stream-browserify"),
      "crypto": require.resolve("crypto-browserify"),
      "assert": require.resolve("assert"),
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "os": require.resolve("os-browserify"),
      "url": require.resolve("url")
    }
  },
  ignoreWarnings: [/Failed to parse source map/],
  module: {
    rules: [
      { test: /\.ts(x?)$/, exclude: /node_modules/, use: ['ts-loader'] },
      { test: /\.js$/, enforce: 'pre', use: ['source-map-loader'] },
      {
        test: /\.(mp4|png|jpeg|svg|woff2)$/,
        use: {
          loader: 'file-loader',
          options: { name: '[name].[hash].[ext]', outputPath: 'assets' }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: 'public/index.html' }),
    // new webpack.DefinePlugin({
    //   'process.env.NODE_DEBUG': JSON.stringify('development')
    // }),
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process/browser'
    })
  ]
};
