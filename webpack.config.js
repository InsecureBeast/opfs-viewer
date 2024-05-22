const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.ts', // Existing entry point
    background: './src/features/background.ts' // New entry point
  },
  module: {
    rules: [
      { test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ }, // Handle TypeScript files
      { test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' }, // Transpile JavaScript with Babel
      { test: /background\.ts$/, use: 'ts-loader' }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'], // Automatically resolve certain file extensions
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: 'manifest.json', to: 'manifest.json' },
        { from: 'src/settings.html', to: 'settings.html' },
        //{ from: 'src/images', to: 'images' },
      ],
    }),
  ],
};