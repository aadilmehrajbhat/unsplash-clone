const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  moduleNameMapper: {
    '\\.svg$': '<rootDir>/src/tests/__mocks__/svg.js',
    '^@hooks(.*)$': '<rootDir>/src/hooks$1',
    '^@utils(.*)$': '<rootDir>/src/utils$1',
    '^@assets(.*)$': '<rootDir>/src/assets$1',
    '^@components(.*)$': '<rootDir>/src/components$1',
    '^@services(.*)$': '<rootDir>/src/services$1',
    '^@pages(.*)$': '<rootDir>/src/pages$1',
    '^@contexts(.*)$': '<rootDir>/src/contexts$1',
    '^@styles(.*)$': '<rootDir>/src/styles$1',
    '^@tests(.*)$': '<rootDir>/src/tests$1',
    '^@lib(.*)$': '<rootDir>/src/lib$1',
  },
  testEnvironment: 'jest-environment-jsdom',
  resetMocks: false,
};

module.exports = createJestConfig(customJestConfig);
