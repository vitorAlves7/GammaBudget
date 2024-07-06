const webpackConfig = require('./webpack.config');  // Ajuste o caminho para seu arquivo de configuração do webpack

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
      'src/app/**/*.spec.ts': ['webpack']
    },
    webpack: webpackConfig,
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
    concurrency: Infinity
  });
};
