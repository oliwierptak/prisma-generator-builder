import { PrismaGeneratorBuilderConfig } from "../../lib/types";
import { logger } from "@prisma/internals";

export class Builder {
  run(config: PrismaGeneratorBuilderConfig) {
    config.plugins.forEach((plugin) => {
      this.info(plugin.location);

      plugin.run(config);
    });
  }

  private info(filename: string) {
    logger.info("Generating: " + filename);
  }
}
