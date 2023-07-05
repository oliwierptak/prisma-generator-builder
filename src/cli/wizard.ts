#!/usr/bin/env node

import { confirm, input } from "@inquirer/prompts";
import { PrismaGeneratorBuilderConfig } from "../lib/types";
import PluginBin from "../component/generator-plugin/plugin/plugin.bin";
import PluginGenerator from "../component/generator-plugin/plugin/plugin.generator";
import PluginPackageJson from "../component/generator-plugin/plugin/plugin.package-json";
import PluginPrismaSchema from "../component/generator-plugin/plugin/plugin.prisma-schema";
import PluginReadme from "../component/generator-plugin/plugin/plugin.readme";
import { PluginCopyFiles } from "../component/generator-plugin/plugin/plugin.copy-files";
import PrismaGeneratorBuilder from "../prisma-generator-builder";

async function wizard() {
  const result = {} as PrismaGeneratorBuilderConfig;

  result.provider = await input({
    message: "Generator provider:",
    default: "prisma-generator-example",
  });

  result.prettyName = await input({
    message: "Generator pretty name:",
    default: "Prisma Generator Example",
  });

  result.defaultOutput = await input({
    message: "Generator output directory:",
    default: "./prisma-generator-example/",
  });

  result.name = await input({
    message: "Generator package name:",
    default: "prisma-generator-example",
  });

  result.author = await input({
    message: "Generator package author:",
    default: "John Doe",
  });

  result.version = await input({
    message: "Generator package version:",
    default: "1.0.0",
  });

  result.description = await input({
    message: "Generator package description:",
    default: "Prisma ORM Generator Example",
  });

  result.license = await input({
    message: "Generator package license:",
    default: "MIT",
  });

  result.outputDirectoryRoot = await input({
    message: "Generator output directory:",
    default: "../prisma-generator-example/",
  });

  result.plugins = [
    new PluginBin(),
    new PluginGenerator(),
    new PluginPackageJson(),
    new PluginPrismaSchema(),
    new PluginReadme(),
    new PluginCopyFiles(),
  ];

  return result;
}

wizard().then(async (config) => {
  const answer = await confirm({
    message: "Build new generator under " + config.outputDirectoryRoot + "?",
  });

  if (answer) {
    PrismaGeneratorBuilder.build(config);

    process.stdout.write("All Done.\n");
    process.stdout.write("\n");

    process.stdout.write("Usage:\n");
    process.stdout.write(" cd " + config.outputDirectoryRoot + "\n");
    process.stdout.write(" npm install\n");
    process.stdout.write(" npx prisma generate\n");
    process.stdout.write("\n");
  }
});
