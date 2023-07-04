import { GeneratorTemplateType } from "../src/lib/types";

export default function getGeneratorTemplate(
  template: GeneratorTemplateType,
): string {
  return `import { generatorHandler, GeneratorOptions } from "@prisma/generator-helper";
import { logger } from "@prisma/internals";
import { version } from "../../package.json";
import { HelloWorld } from "./component/hello-world/hello-world";

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

    helloWorld.hi("prisma-generator-builder");

    helloWorld.debugDataModel(
      options.dmmf.datamodel,
      options.generator.output?.value || "./prisma-generator-builder",
    );
  },
});
`;
}
