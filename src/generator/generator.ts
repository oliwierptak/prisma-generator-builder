import { generatorHandler, GeneratorOptions } from "@prisma/generator-helper";
import { logger } from "@prisma/internals";
import { version } from "../../package.json";
import { HelloWorld } from "./component/hello-world/hello-world";

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
    const helloWorld = new HelloWorld();

    helloWorld.hi("prisma-generator-builder");

    helloWorld.debugDataModel(
      options.dmmf.datamodel,
      options.generator.output?.value || "./prisma-generator-builder"
    );
  },
});
