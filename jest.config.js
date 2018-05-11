module.exports = {
  setupFiles: ['./__testSetup__/index.js'],
  unmockedModulePathPatterns: ['babel-core'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.js'],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
};
