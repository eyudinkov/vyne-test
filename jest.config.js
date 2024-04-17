process.env.TZ = "GMT";

module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/jest-setup.ts"],
  globalSetup: "jest-preset-angular/global-setup",
  roots: ["<rootDir>", "<rootDir>/src"],
  moduleDirectories: ["node_modules", "src"],
  moduleNameMapper: {
    "@core/(.*)": "<rootDir>/src/core/$1",
  },
  setupFiles: [],
  globals: {
    window: {},
  },
  testEnvironment: "jest-environment-jsdom",
  testMatch: ["**/?(*.)+(spec|test).+(ts|js)?(x)"],
  extensionsToTreatAsEsm: [".ts"],
  transform: {
    "^.+\\.(ts|html)$": [
      "jest-preset-angular",
      {
        tsconfig: "<rootDir>/tsconfig.spec.json",
        stringifyContentPathRegex: "\\.(html)$",
        useESM: true,
      },
    ],
    "^.+\\.js$": "babel-jest",
    "^.+\\.tsx?$": "ts-jest",
  },
  transformIgnorePatterns: [
    "/node_modules/robovoice-editor",
    "/node_modules/widget",
  ],
  moduleFileExtensions: ["ts", "html", "js", "json", "mjs", "tsx"],
};
