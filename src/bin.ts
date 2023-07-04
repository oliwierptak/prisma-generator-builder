#!/usr/bin/env node
import PrismaGeneratorBuilder from "./prisma-generator-builder";
import { GeneratorTemplateType } from "./lib/types";

const template: GeneratorTemplateType = {
  provider: "provider",
  prettyName: "prettyName",
  defaultOutput: "defaultOutput",
  name: "example-generator",
  version: "1.0.0",
  author: "John Doe",
  description: "Prisma ORM Generator",
  license: "MIT",
  outputDirectoryRoot: "../prisma-generator-example/",
};

PrismaGeneratorBuilder.build(template);
