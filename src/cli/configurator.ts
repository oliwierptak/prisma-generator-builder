#!/usr/bin/env node

import { confirm, input } from "@inquirer/prompts";
import PluginBin from "../component/generator-plugin/plugin/plugin.bin";
import PluginGenerator from "../component/generator-plugin/plugin/plugin.generator";
import PluginPackageJson from "../component/generator-plugin/plugin/plugin.package-json";
import PluginPrismaSchema from "../component/generator-plugin/plugin/plugin.prisma-schema";
import PluginReadme from "../component/generator-plugin/plugin/plugin.readme";
import { PluginCopyFiles } from "../component/generator-plugin/plugin/plugin.copy-files";
import {
  PrismaGeneratorBuilder,
  PrismaGeneratorBuilderConfig,
} from "../prisma-generator-builder";
import { logger } from "@prisma/internals";
import PluginEnv from "../component/generator-plugin/plugin/plugin.env";
import PluginGitIgnore from "../component/generator-plugin/plugin/plugin.git-ignore";

async function configurator() {
  const result = {} as PrismaGeneratorBuilderConfig;

  result.provider = await input({
    message: "Generator provider:",
    default: "prisma-generator-example",
  });

  result.prettyName = await input({
    message: "Generator pretty name:",
    default: "Prisma Generator Example",
  });

  result.defaultOutput = "./" + result.provider;

  result.name = await input({
    message: "package.json name:",
    default: result.provider,
  });

  result.author = await input({
    message: "package.json author:",
    default: "John Doe",
  });

  result.version = await input({
    message: "package.json version:",
    default: "1.0.0",
  });

  result.description = await input({
    message: "package.json description:",
    default: "Prisma ORM Generator Example",
  });

  result.license = await input({
    message: "package.json license:",
    default: "MIT",
  });

  result.outputDirectoryRoot = await input({
    message: "Output directory:",
    default: "../prisma-generator-example/",
  });

  result.plugins = [
    new PluginBin(),
    new PluginCopyFiles(),
    new PluginEnv(),
    new PluginGenerator(),
    new PluginGitIgnore(),
    new PluginPackageJson(),
    new PluginPrismaSchema(),
    new PluginReadme(),
  ];

  return result;
}

configurator().then(async (config) => {
  const answer = await confirm({
    message: "Build new generator under " + config.outputDirectoryRoot + "?",
  });

  if (answer) {
    PrismaGeneratorBuilder.run(config);

    logger.info("All Done.");

    process.stdout.write("\n");

    process.stdout.write("Usage:\n");
    process.stdout.write(" cd " + config.outputDirectoryRoot + "\n");
    process.stdout.write(" npm install\n");
    process.stdout.write(" npx prisma generate\n");
    process.stdout.write("\n");
  }
});
