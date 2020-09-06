module.exports = function (config) {

  const process = require('process');

  config.set({
    angularCli: {
      environment: 'dev'
    },
    autoWatch: true,
    basePath: '',
    browsers: ['Chrome'],
    client:{
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    colors: true,
    coverageIstanbulReporter: {
      reports: [ 'html', 'lcovonly' ],
      fixWebpackSourcePaths: true,
      thresholds: {
        statements: 95,
        lines: 95,
        branches: 95,
        functions: 95
      }
    },
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    logLevel: config.LOG_INFO,
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    port: 9876,
    reporters: ['progress', 'coverage-istanbul', 'kjhtml'],
    singleRun: false
  });
};
