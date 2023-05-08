module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  verbose: true,
  roots: [
    '<rootDir>/'
  ],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
};