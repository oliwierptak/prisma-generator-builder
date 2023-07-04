import { GeneratorTemplateType } from "../../lib/types";
import { logger } from "@prisma/internals";
import GeneratorPluginInterface from "./generator-plugin-interface";

export class Generator {
  private readonly _pluginCollection: GeneratorPluginInterface[] = [];

  constructor(pluginCollection: GeneratorPluginInterface[]) {
    this._pluginCollection = pluginCollection;
  }

  generate(template: GeneratorTemplateType) {
    this._pluginCollection.forEach((plugin) => {
      this.info(plugin.location);

      plugin.generate(template);
    });
  }

  private info(filename: string) {
    logger.info("Generating: " + filename);
  }
}
