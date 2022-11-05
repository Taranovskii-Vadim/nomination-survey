'use strict';

module.exports = {
  collectCoverage: true,
  modulePaths: ['<rootDir>'],
  testEnvironment: 'jest-environment-jsdom',
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  coveragePathIgnorePatterns: ['src/index.tsx'],
  testMatch: ['**/?(*.)+(spec).ts?(x)'],
  testResultsProcessor: 'jest-sonar-reporter',
  // moduleNameMapper: {
  //   '\\.svg': '<rootDir>/configs/jest/__mocks__/svgrMock.js',
  // },
};
