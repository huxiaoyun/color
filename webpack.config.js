const path = require('path');

module.exports = {
  mode: 'production',

  entry: './src/index.ts',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'lib')
  },

  module: {
    rules: [{
      test: /\.ts$/,
      use: "ts-loader"
    },{
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: ['@babel/plugin-proposal-object-rest-spread']
        }
      },
    }],
  },
  resolve: {
    extensions: [
      '.ts', '.js'
    ]
  }
};
