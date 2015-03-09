module.exports = {
  entry: {
    Home: './app/App.js'
  },
  output: {
    filename: 'public/bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'jsx-loader?harmony' }
    ]
  }

};
