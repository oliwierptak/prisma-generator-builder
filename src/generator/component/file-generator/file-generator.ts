import {
  AssociativeArray,
  GeneratorTemplateType,
  PackageJsonTemplateType,
} from "../../../lib/types";
import getGeneratorTemplate from "../../../../template/generator.template";
import FileWriter from "../../helper/helper.file-writer";
import path from "path";
import getPackageJsonTemplate from "../../../../template/package.json.template";
import { logger } from "@prisma/internals";
import * as templateListFromJson from "../../../../template.json";

export class FileGenerator {
  private readonly outputDirectoryRoot: string;

  constructor(outputDirectory = "./build") {
    this.outputDirectoryRoot = outputDirectory;
  }

  generateGeneratorTs(template: GeneratorTemplateType): void {
    this.info("generator.ts");

    const result = getGeneratorTemplate(template);

    FileWriter.saveTypescriptFile(
      path.join(this.outputDirectoryRoot, "src/generator/generator.ts"),
      result
    );
  }

  generatePackageJson(template: PackageJsonTemplateType): void {
    this.info("package.json");

    const result = getPackageJsonTemplate(template);

    FileWriter.saveFile(
      path.join(this.outputDirectoryRoot, "package.json"),
      result
    );
  }

  generateBinTs(): void {
    this.info("bin.ts");

    FileWriter.saveFile(
      path.join(this.outputDirectoryRoot, "src/bin.ts"),
      `#!/usr/bin/env node
import "./generator/generator";
`
    );
  }

  copyFiles(): void {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { default: _, ...filesToCopy } =
      templateListFromJson as AssociativeArray<string[]>;

    logger.info("Copying files...");

    for (const [key, fileList] of Object.entries(filesToCopy)) {
      const directory = path.join(this.outputDirectoryRoot, key);
      fileList.forEach((file) => {
        logger.info(file);

        FileWriter.copyTemplateFile(file, directory);
      });
    }
  }

  private info(filename: string) {
    logger.info("Generating: " + filename);
  }
}
