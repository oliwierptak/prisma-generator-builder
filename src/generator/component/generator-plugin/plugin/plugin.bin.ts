import GeneratorPluginInterface from "../../generator/generator-plugin-interface";
import { GeneratorTemplateType } from "../../../../lib/types";
import AbstractPlugin from "../abstract.plugin";

export default class PluginBin
  extends AbstractPlugin
  implements GeneratorPluginInterface
{
  public readonly location = "src/bin.ts";

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected loadTemplate(template: GeneratorTemplateType): string {
    return `#!/usr/bin/env node
import "./generator/generator";
`;
  }
}
