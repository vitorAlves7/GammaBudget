module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', 'karma-typescript'], 
    files: [
      { pattern: 'src/**/*.spec.ts', included: false }
    ],
    exclude: [],
    preprocessors: {
      'src/**/*.spec.ts': ['karma-typescript']  // Usando karma-typescript como preprocessor
    },
    reporters: ['progress', 'junit', 'karma-typescript'], // Adicionando karma-typescript como reporter
    junitReporter: {
      outputDir: 'tests/reports',
      useBrowserName: true
    },
    karmaTypescriptConfig: {
      tsconfig: './tsconfig.json'  // Especificando o caminho para o tsconfig.json
      // Outras opções de configuração do karma-typescript, se necessário
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
