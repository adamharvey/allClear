module.exports = {
  entry: {
    Home: './app/App.js'
  },
  output: {
    filename: 'public/bundle.js'
  },
  resolve: {
    alias: {
      'firebase': 'firebase/lib/firebase-web'
    }
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'jsx-loader?harmony' }
    ]
  }

};
