import PrismaGeneratorBuilderPluginInterface from "../../generator/plugin-interface";
import AbstractPlugin from "../abstract.plugin";
import { PrismaGeneratorBuilderConfig } from "../../../lib/types";

export default class PluginPackageJson
  extends AbstractPlugin
  implements PrismaGeneratorBuilderPluginInterface
{
  public readonly location = "package.json";

  protected loadTemplate(template: PrismaGeneratorBuilderConfig): string {
    return `{
  "name": "${template.name}",
  "version": "1.0.0",
  "description": "${template.description}",
  "keywords": [
    "orm",
    "prisma",
    "prisma-generator",
    "prisma-schema"
  ],
  "author": "${template.author}",
  "license": "${template.license}",
  "dependencies": {
    "@inquirer/confirm": "^2.0.4",
    "@inquirer/prompts": "^2.3.0",
    "@prisma/generator-helper": "^5.0.0",
    "@prisma/internals": "^5.0.0",
    "ts-command-line-args": "^2.5.1",
    "ts-toolbelt": "^9.6.0",
    "typescript": "^5.1.6"
  },
  "devDependencies": {
    "@jest/globals": "^29.5.0",
    "@prisma/client": "^5.0.0",
    "@types/inquirer": "^9.0.3",
    "@types/jest": "^29.5.2",
    "@types/node": "^20.3.2",
    "@typescript-eslint/eslint-plugin": "^5.60.1",
    "eslint": "^8.43.0",
    "eslint-config-prettier": "^8.8.0",
    "eslint-plugin-jest": "^27.2.2",
    "eslint-plugin-prettier": "^4.2.1",
    "jest": "^29.5.0",
    "jest-mock-extended": "^3.0.4",
    "prettier": "^2.8.8",
    "prisma": "^5.0.0",
    "ts-jest": "^29.1.1",
    "ts-node": "^10.9.1"
  }
}`;
  }
}
