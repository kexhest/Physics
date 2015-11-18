var path = require('path')
var webpack = require('webpack')
var objectAssign = require('object-assign')

var production = process.env.NODE_ENV === 'production'
var test = process.env.NODE_ENV === 'test'

var config = {
  resolve: {
    extensions: ['', '.js'],
    modulesDirectories: ['node_modules']
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /(node_modules)/
      }
    ]
  }
}

if (!test) {
  objectAssign(config, {

    entry: [
      path.resolve(__dirname, 'lib', 'index.js')
    ],

    output: {
      path: path.resolve(__dirname, 'build'),
      filename: production ? 'traer.min.js' : 'traer.js',
      library: 'TRAER',
      libraryTarget: 'umd'
    },

    plugins: [].concat(production ? [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        output: {
          comments: false
        },
        compress: {
          warnings: false
        }
      })
    ] : [
      new webpack.NoErrorsPlugin()
    ])
  })
}

module.exports = config
