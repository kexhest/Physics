module.exports = function (karma) {
  karma.set({
    basePath: '.',
    frameworks: ['mocha', 'sinon-chai'],
    files: [
      'test/*'
    ],
    preprocessors: {
      'test/*': ['webpack']
    },
    webpack: require('./webpack.config.js'),
    webpackMiddleware: {
      noInfo: true
    },
    singleRun: process.env.TRAVIS_CI === 'true',
    browsers: ['PhantomJS'],
    reporters: ['nyan']
  })
}
