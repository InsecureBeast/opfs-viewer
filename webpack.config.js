const path = require('path');

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
};