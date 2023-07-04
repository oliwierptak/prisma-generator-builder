import FileWriter from "../../helper/helper.file-writer";
import path from "path";
import GeneratorPluginInterface from "../generator/generator-plugin-interface";
import { GeneratorTemplateType } from "../../../lib/types";

export default abstract class AbstractPlugin
  implements GeneratorPluginInterface
{
  public abstract readonly location: string;

  generate(template: GeneratorTemplateType): void {
    FileWriter.saveFile(
      path.join(template.outputDirectoryRoot, this.location),
      this.loadTemplate(template)
    );
  }

  protected abstract loadTemplate(template: GeneratorTemplateType): string;
}
