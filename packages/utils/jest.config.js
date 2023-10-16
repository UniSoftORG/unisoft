module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testMatch: ['**/*.test.ts'],
  roots: ['<rootDir>/tests'],
  moduleNameMapper: {
    '^@types$': '<rootDir>/@types/index.ts'
  }
};
