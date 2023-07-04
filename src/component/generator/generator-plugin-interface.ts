import { GeneratorTemplateType } from "../../lib/types";

export default interface GeneratorPluginInterface {
  readonly location: string;

  generate(template: GeneratorTemplateType): void;
}
