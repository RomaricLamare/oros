/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type {Config} from 'jest';

const config: Config = {

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",

  // A list of paths to modules that run some code to configure or set up the testing framework before each test
   setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  // The test environment that will be used for testing
  testEnvironment: "jsdom",

  // indication to jest how to transform TypeScript files into JavaScript for test execution
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '.+\\.(css|styl|less|sass|scss)$': 'jest-css-modules-transform'
   },

  // The glob patterns Jest uses to detect test files
   testMatch: [
     "**/__tests__/**/*.[jt]s?(x)",
     "**/?(*.)+(spec|test).[tj]s?(x)"
   ],

   // resolution for @ aliases
   moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
   },
};

export default config;
