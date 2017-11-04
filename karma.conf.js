
module.exports = function(config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '',

    frameworks: ['require','mocha', 'chai'],

    // list of files / patterns to load in the browser
    files: [
      'lib/**/*.js',
      'lib/test/**/*.js'
    ],
    exclude: [

    ],
    reporters: ['progress', 'osx'],
    port: 9876,
    colors: true,

    logLevel: config.LOG_INFO,
    autoWatch: true,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['Chrome','Firefox','PhantomJS'],


    captureTimeout: 60000,
    singleRun: false
  });
};
