import { generatorHandler, GeneratorOptions } from "@prisma/generator-helper";
import * as path from "path";
import { logger } from "@prisma/internals";
import { version } from "../../package.json";
import FileWriter from "./helper/helper.file-writer";

generatorHandler({
  onManifest: () => ({
    version: version,
    logger: logger,
    provider: "prisma-generator-builder",
    prettyName: "Prisma Generator Builder",
    requiresGenerators: ["prisma-client-js"],
    defaultOutput: "./prisma-generator-builder",
  }),
  onGenerate: async (options: GeneratorOptions) => {
    const filename = path.join(
      options.generator.output?.value || "./prisma-generator-builder",
      "data-model.json"
    );

    logger.info("Executing " + options.generator.name);

    FileWriter.saveFile(filename, JSON.stringify(options.dmmf.datamodel));

    logger.info("Generated datamodel under: data-model.json");
  },
});
