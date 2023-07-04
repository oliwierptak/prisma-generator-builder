import { PrismaGeneratorBuilderConfig } from "../../lib/types";
import { logger } from "@prisma/internals";

export class Generator {
  generate(config: PrismaGeneratorBuilderConfig) {
    config.plugins.forEach((plugin) => {
      this.info(plugin.location);

      plugin.generate(config);
    });
  }

  private info(filename: string) {
    logger.info("Generating: " + filename);
  }
}
