import GeneratorPluginInterface from "../../generator/generator-plugin-interface";
import { AssociativeArray, GeneratorTemplateType } from "../../../lib/types";
import { logger } from "@prisma/internals";
import path from "path";
import FileWriter from "../../../generator/helper/helper.file-writer";
import * as templateListFromJson from "../../../../template.json";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { default: _, ...templateFiles } =
  templateListFromJson as AssociativeArray<string[]>;

class PluginCopyFiles implements GeneratorPluginInterface {
  public readonly location = ".";

  generate(template: GeneratorTemplateType): void {
    for (const [location, fileList] of Object.entries(templateFiles)) {
      const directory = path.join(template.outputDirectoryRoot, location);
      fileList.forEach((file) => {
        logger.info("Generating: " + path.join(location, file));

        FileWriter.copyTemplateFile(file, directory);
      });
    }
  }
}

export { PluginCopyFiles, templateFiles };
