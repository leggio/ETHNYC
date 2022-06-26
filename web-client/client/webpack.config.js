const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets')
    }
  },
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
  plugins: [new HtmlWebpackPlugin({ template: 'public/index.html' })]
};
