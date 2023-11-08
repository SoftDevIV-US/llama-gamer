import type { Config } from 'jest';

const config: Config = {
  testRegex: '.*\\.spec\\.ts$',
  collectCoverage: true,
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/coverage/',
    '/prisma/generated/',
    '/prisma/migrations/',
    '/.turbo/',
  ],
  testEnvironment: 'node',
  collectCoverageFrom: ['src/**/*.ts', '!src/**/*.module.ts'],
  coveragePathIgnorePatterns: [
    '<rootDir>/src/main.ts',
    '<rootDir>/src/prisma/prisma.service.ts',
    '<rootDir>/src/utils/constants.ts',
  ],
  coverageThreshold: {
    global: {
      statements: 90,
      branches: 90,
      functions: 90,
      lines: 90,
    },
  },
  moduleDirectories: ['src', 'node_modules'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1',
  },
  rootDir: '.',
};

export default config;
