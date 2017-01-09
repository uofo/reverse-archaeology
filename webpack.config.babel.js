/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import path from 'path';
import webpack from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
  context: __dirname,
  entry: './index.jsx',
  output: {
    path: `${__dirname}/__dev__`,
    publicPath: '/',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
            'file?hash=sha512&digest=hex&name=[hash].[ext]',
            'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      },
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.scss$/, loaders: [
        'style-loader',
        'css-loader',
        'sass-loader?includePaths[]=' + path.resolve(__dirname, './node_modules/compass-mixins/lib')
      ]},
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: '404.html' },
      { from: 'img', to: 'img' },
      { from: 'fonts', to: 'fonts' }
    ]),
    new HtmlWebpackPlugin({
      template: 'index.template.ejs',
      inject: 'body'
    }),
  ],
};
