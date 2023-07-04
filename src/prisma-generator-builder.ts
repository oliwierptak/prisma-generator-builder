import { GeneratorTemplateType } from "./lib/types";
import { Generator } from "./generator/component/generator/generator";
import { PluginContainer } from "./generator/component/generator-plugin/plugin.container";

class PrismaGeneratorBuilder {
  static build(template: GeneratorTemplateType): void {
    const generator = new Generator(PluginContainer.plugins);

    generator.generate(template);
  }
}

export default PrismaGeneratorBuilder;
