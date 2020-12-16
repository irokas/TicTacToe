module.exports = {
  setupFiles: ["./setup.js"],
  setupFilesAfterEnv: ["./jestconfig.js"],
  collectCoverage: true,
  coverageDirectory: "./coverage/",
  moduleFileExtensions: ["js", "jsx"],
  transform: {
    "^.+\\.js?$": "babel-jest",
  },
};
