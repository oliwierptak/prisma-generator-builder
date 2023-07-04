import { describe, test } from "@jest/globals";
import { Generator } from "./generator";
import { PrismaGeneratorBuilderConfig } from "../../lib/types";
import path from "path";
import {
  PluginCopyFiles,
  templateFiles,
} from "../generator-plugin/plugin/plugin.copy-files";
import PluginBin from "../generator-plugin/plugin/plugin.bin";
import PluginGenerator from "../generator-plugin/plugin/plugin.generator";
import PluginPackageJson from "../generator-plugin/plugin/plugin.package-json";
import PluginPrismaSchema from "../generator-plugin/plugin/plugin.prisma-schema";
import PluginReadme from "../generator-plugin/plugin/plugin.readme";
import fs from "fs";

jest.mock("@prisma/internals");

beforeEach(() => jest.clearAllMocks());

describe("Generator", () => {
  test("generate() should generate files", async () => {
    const config: PrismaGeneratorBuilderConfig = {
      provider: "provider",
      prettyName: "prettyName",
      defaultOutput: "defaultOutput",
      name: "example-generator",
      version: "1.0.0",
      author: "John Doe",
      description: "Prisma ORM Generator",
      license: "MIT",
      outputDirectoryRoot: "./build",
      plugins: [
        new PluginBin(),
        new PluginGenerator(),
        new PluginPackageJson(),
        new PluginPrismaSchema(),
        new PluginReadme(),
        new PluginCopyFiles(),
      ],
    };

    const generator = new Generator();
    generator.generate(config);

    for (const [location, fileList] of Object.entries(templateFiles)) {
      const directory = path.join(config.outputDirectoryRoot, location);
      fileList.forEach((file) => {
        expect(fs.existsSync(path.join(directory, file))).toBe(true);
      });
    }
  });
});
