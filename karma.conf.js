module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', 'karma-typescript'],
    files: [
      'src/**/*.spec.ts'  // Arquivos de teste TypeScript
    ],
    exclude: [],
    preprocessors: {
      'src/**/*.spec.ts': ['karma-typescript']  // Usando karma-typescript como preprocessor
    },
    reporters: ['progress', 'junit', 'karma-typescript'],
    junitReporter: {
      outputDir: 'tests/reports',
      useBrowserName: true
    },
    karmaTypescriptConfig: {
      tsconfig: './tsconfig.json'  // Caminho para o seu arquivo tsconfig.json
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
