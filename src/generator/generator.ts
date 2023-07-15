import { generatorHandler, GeneratorOptions } from "@prisma/generator-helper";
import { logger } from "@prisma/internals";
import { version } from "../../package.json";
import { HelloWorld } from "./helper/helper.hello-world";

generatorHandler({
  onManifest: () => ({
    version: version,
    logger: logger,
    provider: "prisma-generator-generator",
    prettyName: "Prisma Generator Generator",
    requiresGenerators: ["prisma-client-js"],
    defaultOutput: "./prisma-generator-generator",
  }),
  onGenerate: async (options: GeneratorOptions) => {
    const helloWorld = new HelloWorld();

    helloWorld.hi("prisma-generator-generator");

    helloWorld.debugDataModel(
      options.dmmf.datamodel,
      options.generator.output?.value || "./prisma-generator-example"
    );
  },
});
