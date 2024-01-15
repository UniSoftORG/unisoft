module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testMatch: ["**/*.init.ts"],
  roots: ["<rootDir>/tests"],
  moduleNameMapper: {
    "^@utils$": "<rootDir>/@templates/index.ts",
  },
};
