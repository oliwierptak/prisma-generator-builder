import PrismaGeneratorBuilderPluginInterface from "../../generator/plugin-interface";
import { PrismaGeneratorBuilderConfig } from "../../../lib/types";
import AbstractPlugin from "../abstract.plugin";

export default class PluginBin
  extends AbstractPlugin
  implements PrismaGeneratorBuilderPluginInterface
{
  public readonly location = "src/bin.ts";

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected loadTemplate(template: PrismaGeneratorBuilderConfig): string {
    return `#!/usr/bin/env node
import "./generator/generator";
`;
  }
}
