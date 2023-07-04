import GeneratorPluginInterface from "../../generator/generator-plugin-interface";
import AbstractPlugin from "../abstract.plugin";
import { GeneratorTemplateType } from "../../../lib/types";

export default class PluginPackageJson
  extends AbstractPlugin
  implements GeneratorPluginInterface
{
  public readonly location = "package.json";

  protected loadTemplate(template: GeneratorTemplateType): string {
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
}`;
  }
}
