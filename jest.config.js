module.exports = {
  roots: ["<rootDir>/src"],
  testRegex: "\\.(test|spec)\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  modulePaths: ["src", "node_modules"],
};
