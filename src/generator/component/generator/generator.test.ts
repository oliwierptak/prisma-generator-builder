import { describe, test } from "@jest/globals";
import { Generator } from "./generator";
import { GeneratorTemplateType } from "../../../lib/types";
import path from "path";
import { logger } from "@prisma/internals";
import { PluginContainer } from "../generator-plugin/plugin.container";
import { templateFiles } from "../generator-plugin/plugin/plugin.copy-files";

jest.mock("@prisma/internals");

beforeEach(() => jest.clearAllMocks());

describe("Builder", () => {
  test("generate() should generate files", async () => {
    const template: GeneratorTemplateType = {
      provider: "provider",
      prettyName: "prettyName",
      defaultOutput: "defaultOutput",
      name: "example-generator",
      version: "1.0.0",
      author: "John Doe",
      description: "Prisma ORM Generator",
      license: "MIT",
      outputDirectoryRoot: "./build",
    };

    const builder = new Generator(PluginContainer.plugins);
    builder.generate(template);

    for (const [location, fileList] of Object.entries(templateFiles)) {
      const directory = path.join(template.outputDirectoryRoot, location);
      fileList.forEach((file) => {
        logger.info(file);

        //FileWriter.copyTemplateFile(file, directory);
        //expect(fs.existsSync(path.join(directory, file))).toBe(true);
      });
    }
  });
});
6;
