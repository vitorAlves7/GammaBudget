module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
  
      'src/app/**/*.spec.ts'
    ],
    exclude: [
    ],
    preprocessors: {
      
    },
    reporters: ['progress', 'junit'],
    junitReporter: {
      outputDir: 'tests/reports',
      outputFile: undefined,
      suite: '',
      useBrowserName: true,
      nameFormatter: undefined,
      classNameFormatter: undefined,
      properties: {},
      xmlVersion: null
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['FirefoxHeadless'],
    singleRun: true,
    concurrency: Infinity,
 
  });
};
