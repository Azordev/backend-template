module.exports = {
  preset: 'ts-jest',
  roots: ['./src'],
  testEnvironment: 'node',
  setupFiles: ['dotenv/config'],
  testURL: 'http://localhost',
  collectCoverageFrom: ['!node_modules/**', 'api/**/*.js', 'service/**/*.js'],
}
