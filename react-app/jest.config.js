module.exports = {
  setupFiles: ["./setup.js"],
  collectCoverage: true,
  moduleFileExtensions: ["js", "jsx"],
  transform: {
    "^.+\\.js?$": "babel-jest",
  },
};
