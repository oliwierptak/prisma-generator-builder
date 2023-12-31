#!/usr/bin/env node
import {
  PrismaGeneratorBuilder,
  PrismaGeneratorBuilderConfig,
} from "./prisma-generator-builder";
import PluginBin from "./component/generator-plugin/plugin/plugin.bin";
import PluginGenerator from "./component/generator-plugin/plugin/plugin.generator";
import PluginPackageJson from "./component/generator-plugin/plugin/plugin.package-json";
import PluginPrismaSchema from "./component/generator-plugin/plugin/plugin.prisma-schema";
import PluginReadme from "./component/generator-plugin/plugin/plugin.readme";
import { PluginCopyFiles } from "./component/generator-plugin/plugin/plugin.copy-files";
import PluginEnv from "./component/generator-plugin/plugin/plugin.env";
import PluginGitIgnore from "./component/generator-plugin/plugin/plugin.git-ignore";

const config: PrismaGeneratorBuilderConfig = {
  provider: "prisma-generator-example",
  prettyName: "Prisma Generator Example",
  defaultOutput: "./prisma-generator-example",
  name: "prisma-generator-example",
  version: "1.0.0",
  author: "John Doe",
  description: "Prisma ORM Generator",
  license: "MIT",
  outputDirectoryRoot: "../prisma-generator-example/",
  plugins: [
    new PluginBin(),
    new PluginCopyFiles(),
    new PluginEnv(),
    new PluginGenerator(),
    new PluginGitIgnore(),
    new PluginPackageJson(),
    new PluginPrismaSchema(),
    new PluginReadme(),
  ],
};

PrismaGeneratorBuilder.run(config);
