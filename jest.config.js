/** @type {import("ts-jest").JestConfigWithTsJest} */
module.exports = {
  collectCoverage: true,
  coverageDirectory: './coverage',
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/tests/singleton.ts'],
};
