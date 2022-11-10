'use strict';

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: ['**/*.ts'],
  testMatch: ['**/*.spec.ts'],
  verbose: true,
  forceExit: true,
  // clearMocks: true,
};
