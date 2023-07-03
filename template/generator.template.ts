import { GeneratorTemplateType } from "../src/lib/types";

export default function getGeneratorTemplate(
  template: GeneratorTemplateType,
): string {
  return `import { generatorHandler, GeneratorOptions } from "@prisma/generator-helper";
import * as path from "path";
import { logger } from "@prisma/internals";
import { version } from "../../package.json";
import FileWriter from "./helper/helper.file-writer";

generatorHandler({
  onManifest: () => ({
    version: version,
    logger: logger,
    provider: "${template.provider}",
    prettyName: "${template.prettyName}",
    requiresGenerators: ["prisma-client-js"],
    defaultOutput: "${template.defaultOutput}",
  }),
  onGenerate: async (options: GeneratorOptions) => {
    const filename = path.join(
      options.generator.output?.value || "./prisma-generator-builder",
      "data-model.json",
    );

    logger.info("Welcome to " + options.generator.name);

    FileWriter.saveFile(filename, JSON.stringify(options.dmmf.datamodel));

    logger.info("Generated datamodel under: data-model.json");
  },
});
`;
}
