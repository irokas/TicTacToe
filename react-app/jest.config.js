module.exports = {
  setupFiles: ["./setup.js"],
  collectCoverage: true,
  coverageDirectory: "./coverage/",
  moduleFileExtensions: ["js", "jsx"],
  transform: {
    "^.+\\.js?$": "babel-jest",
  },
};
