module.exports = {
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!sdenv-jsdom|jsdom|parse5)/', // 👈 让 Jest 转换这些包
  ],
  testEnvironment: 'node',
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/$1",
    "@utils/(.*)": "<rootDir>/utils/$1",
    "@handler/(.*)": "<rootDir>/handler/$1",
    "@bin/(.*)": "<rootDir>/bin/$1"
  }
};
