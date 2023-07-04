import GeneratorPluginInterface from "../../generator/generator-plugin-interface";
import { PrismaGeneratorOptionTemplateType } from "../../../../lib/types";
import AbstractPlugin from "../abstract.plugin";

export default class PluginGenerator
  extends AbstractPlugin
  implements GeneratorPluginInterface
{
  public readonly location = "src/generator/generator.ts";

  protected loadTemplate(template: PrismaGeneratorOptionTemplateType): string {
    return `import { generatorHandler, GeneratorOptions } from "@prisma/generator-helper";
import { logger } from "@prisma/internals";
import { version } from "../../package.json";
import { HelloWorld } from "./helper/helper.hello-world";

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
    const helloWorld = new HelloWorld();

    helloWorld.hi("${template.provider}");

    helloWorld.debugDataModel(
      options.dmmf.datamodel,
      options.generator.output?.value || "./${template.provider}",
    );
  },
});
`;
  }
}
