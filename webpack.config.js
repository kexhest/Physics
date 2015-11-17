var path = require('path')
var webpack = require('webpack')
var objectAssign = require('object-assign')

var production = process.env.NODE_ENV === 'production'
var dev = process.env.NODE_ENV === 'dev'
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
    debug: dev,
    devtool: dev ? 'eval-source-map' : undefined,

    entry: [
      path.resolve(__dirname, 'src', 'Physics.js')
    ],

    output: {
      path: path.resolve(__dirname, 'build'),
      filename: production ? 'physics.min.js' : 'physics.js',
      library: 'Physics',
      libraryTarget: 'umd'
    },

    externals: [
      {
        'Vector': {
          root: 'Vector',
          commonjs2: 'Vector',
          commonjs: ['Physics', 'Vector'],
          amd: 'Vector'
        }
      },
      {
        'ParticleSystem': {
          root: 'ParticleSystem',
          commonjs2: 'ParticleSystem',
          commonjs: ['Physics', 'ParticleSystem'],
          amd: 'ParticleSystem'
        }
      },
      {
        'Particle': {
          root: 'Particle',
          commonjs2: 'Particle',
          commonjs: ['Physics', 'Particle'],
          amd: 'Particle'
        }
      },
      {
        'Attraction': {
          root: 'Attraction',
          commonjs2: 'Attraction',
          commonjs: ['Physics', 'Attraction'],
          amd: 'Attraction'
        }
      },
      {
        'Integrator': {
          root: 'Integrator',
          commonjs2: 'Integrator',
          commonjs: ['Physics', 'Integrator'],
          amd: 'Integrator'
        }
      },
      {
        'Spring': {
          root: 'Spring',
          commonjs2: 'Spring',
          commonjs: ['Physics', 'Spring'],
          amd: 'Spring'
        }
      }
    ],

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
