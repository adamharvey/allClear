path = require('path')


module.exports = {
  entry: {
    app: './app/App.js'
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  resolve: {
    alias: {
      'firebase': 'firebase/lib/firebase-web'
    }
  },
  module: {
    rules: [
      { test: /\.js$/, loader: 'jsx-loader?harmony' }
    ]
  }

};
