// const { pathsToModuleNameMapper } = require("ts-jest");
// const { compilerOptions } = require("./tsconfig.json");

// module.exports = {
//   moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: "<rootDir>/" }),
//   preset: "ts-jest",
//   testEnvironment: "node",
//   transform: {
//     "^.+\\.ts?$": "ts-jest",
//   },
//   transformIgnorePatterns: ["<rootDir>/node_modules/"],
// };
//
import { pathsToModuleNameMapper } from "ts-jest";
import { compilerOptions } from "./tsconfig.json";

export default {
  coverageDirectory: "coverage/jest",
  testEnvironment: "jsdom",
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
  testPathIgnorePatterns: ["\\\\node_modules\\\\", "<rootDir>/cypress/"],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: "<rootDir>/" }),
    "\\.(css)$": "<rootDir>/styleMock.ts",
  },
  transform: {
    "^.+\\.(ts|js)x?$": "ts-jest",
  },
};
