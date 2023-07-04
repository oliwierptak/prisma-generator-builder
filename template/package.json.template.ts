import { PackageJsonTemplateType } from "../src/lib/types";

export default function templateGetPackageJsonTemplate(
  template: PackageJsonTemplateType,
): string {
  return `{
  "name": "${template.name}",
  "version": "1.0.0",
  "description": "${template.description}",
  "bin": {
    "prisma-generator-seeder": "dist/bin.js"
  },
  "keywords": [
    "orm",
    "prisma",
    "prisma-generator",
    "prisma-schema"
  ],
  "author": "${template.author}",
  "license": "${template.license}",
  "dependencies": {
    "@prisma/generator-helper": "*",
    "@prisma/internals": "*",
    "ts-toolbelt": "*",
    "typescript": "*"
  },
  "devDependencies": {
    "@jest/globals": "*",
    "@prisma/client": "*",
    "@types/jest": "*",
    "@types/node": "*",
    "@typescript-eslint/eslint-plugin": "*",
    "eslint": "*",
    "eslint-config-prettier": "*",
    "eslint-plugin-jest": "*",
    "eslint-plugin-prettier": "*",
    "jest": "*",
    "jest-mock-extended": "*",
    "prettier": "*",
    "prisma": "*",
    "ts-jest": "*",
    "ts-node": "*"
  }
}
`;
}
