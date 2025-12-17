module.exports = {
  testEnvironment: "jsdom",
  testMatch: ["<rootDir>/src/**/*.test.js"],  // FIXED
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css|less|scss)$": "identity-obj-proxy",
  },
};

