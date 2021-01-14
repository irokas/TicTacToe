module.exports = {
  setupFiles: ["./setup.js"],
  setupFilesAfterEnv: ["./jestconfig.js"],
  collectCoverage: true,
  coverageDirectory: "./coverage/",
  moduleFileExtensions: ["js", "jsx"],
  transform: {
    "^.+\\.js?$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
};
