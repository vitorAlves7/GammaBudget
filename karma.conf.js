module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine',"karma-typescript"],
    files: [
      'src/**/*.spec.ts'
    ],
    exclude: [],
    preprocessors: {
      "**/*.spec.ts": "karma-typescript" 
  },
    reporters: ['progress', 'junit' ,"karma-typescript" ],
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
