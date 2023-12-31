import FileWriter from "../../generator/helper/helper.file-writer";
import path from "path";
import PrismaGeneratorBuilderPluginInterface from "../generator/plugin-interface";
import { PrismaGeneratorBuilderConfig } from "../../lib/types";

export default abstract class AbstractPlugin
  implements PrismaGeneratorBuilderPluginInterface
{
  public abstract readonly location: string;

  run(template: PrismaGeneratorBuilderConfig): void {
    FileWriter.saveFile(
      path.join(template.outputDirectoryRoot, this.location),
      this.loadTemplate(template)
    );
  }

  protected abstract loadTemplate(config: PrismaGeneratorBuilderConfig): string;
}
