module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'src/**/*.spec.ts'
    ],
    exclude: [],
    preprocessors: {
      'src/**/*.spec.ts': ['webpack'] 
    },
    reporters: ['progress', 'junit'],
    junitReporter: {
      outputDir: 'tests/reports',
      useBrowserName: true
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['FirefoxHeadless'],
    singleRun: true,
    concurrency: Infinity
  });
};
