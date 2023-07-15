import PrismaGeneratorBuilderPluginInterface from "../../generator/plugin-interface";
import {
  AssociativeArray,
  PrismaGeneratorBuilderConfig,
} from "../../../lib/types";
import { logger } from "@prisma/internals";
import path from "path";
import FileWriter from "../../../generator/helper/helper.file-writer";
import * as templateListFromJson from "../../../../template.json";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { default: _, ...templateFiles } =
  templateListFromJson as AssociativeArray<string[]>;

class PluginCopyFiles implements PrismaGeneratorBuilderPluginInterface {
  public readonly location = ".";

  run(config: PrismaGeneratorBuilderConfig): void {
    for (const [location, fileList] of Object.entries(templateFiles)) {
      const directory = path.join(config.outputDirectoryRoot, location);
      fileList.forEach((file) => {
        logger.info("Generating: " + path.join(location, file));

        FileWriter.copyTemplateFile(file, directory);
      });
    }
  }
}

export { PluginCopyFiles, templateFiles };
