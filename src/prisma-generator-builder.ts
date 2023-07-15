import { PrismaGeneratorBuilderConfig } from "./lib/types";
import { Builder } from "./component/generator/builder";

class PrismaGeneratorBuilder {
  static run(config: PrismaGeneratorBuilderConfig): void {
    const builder = new Builder();

    builder.run(config);
  }
}

export { PrismaGeneratorBuilder, PrismaGeneratorBuilderConfig };
