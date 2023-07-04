import { PrismaGeneratorBuilderConfig } from "./lib/types";
import { Generator } from "./component/generator/generator";

class PrismaGeneratorBuilder {
  static build(config: PrismaGeneratorBuilderConfig): void {
    const generator = new Generator();

    generator.generate(config);
  }
}

export default PrismaGeneratorBuilder;
