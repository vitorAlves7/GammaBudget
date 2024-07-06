module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-junit-reporter'),
      require('karma-firefox-launcher'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    files: [
      'src/**/*.spec.ts' // Ajuste o caminho para seus arquivos de teste
    ],
    exclude: [],
    preprocessors: {
      'src/**/*.spec.ts': ['@angular-devkit/build-angular']
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
    concurrency: Infinity
  });
};
