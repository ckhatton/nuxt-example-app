module.exports = {
  moduleNameMapper: {
    '^~~/(.*)$': '<rootDir>/$1',
    '^@/(.*)$': '<rootDir>/app/$1',
    '^~/(.*)$': '<rootDir>/app/$1',
  },
  moduleFileExtensions: ['ts', 'js', 'vue', 'json'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.ts?$': 'ts-jest',
    '.*\\.(vue)$': '@vue/vue3-jest',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/app/components/**/*.vue',
    '<rootDir>/app/pages/**/*.vue',
    '<rootDir>/server/**/*.js',
  ],
  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"],
  },
};
