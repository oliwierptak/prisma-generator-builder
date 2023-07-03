module.exports = {
  roots: ["./src"],
  transform: { "^.+\\.ts?$": "ts-jest" },
  testEnvironment: "node",
  //testRegex: "/tests/suite/.*\\.(test|spec)?\\.(ts|tsx)$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  /*  moduleNameMapper: {
    "^@helper/(.*)": "<rootDir>/src/helper/$1",
    "^@schema/(.*)": "<rootDir>/src/schema/$1",
    "^@lib/(.*)": "<rootDir>/src/lib/$1",
  },*/
};
