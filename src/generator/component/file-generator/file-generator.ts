import {
  AssociativeArray,
  GeneratorTemplateType,
  PackageJsonTemplateType,
  ReadmeTemplateType,
} from "../../../lib/types";
import templateGetGeneratorTemplate from "../../../../template/generator.template";
import FileWriter from "../../helper/helper.file-writer";
import path from "path";
import templateGetPackageJsonTemplate from "../../../../template/package.json.template";
import { logger } from "@prisma/internals";
import * as templateListFromJson from "../../../../template.json";
import templateGetReadmeTemplate from "../../../../template/readme.md";
import templateGetPrismaSchemaTemplate from "../../../../template/schema.prisma.template";

export class FileGenerator {
  private readonly outputDirectoryRoot: string;

  constructor(outputDirectory = "./build") {
    this.outputDirectoryRoot = outputDirectory;
  }

  generateGeneratorTs(template: GeneratorTemplateType): void {
    this.info("generator.ts");

    const data = templateGetGeneratorTemplate(template);

    FileWriter.saveTypescriptFile(
      path.join(this.outputDirectoryRoot, "src/generator/generator.ts"),
      data
    );
  }

  generatePackageJson(template: PackageJsonTemplateType): void {
    this.info("package.json");

    const data = templateGetPackageJsonTemplate(template);

    FileWriter.saveFile(
      path.join(this.outputDirectoryRoot, "package.json"),
      data
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
  generateReadme(template: ReadmeTemplateType): void {
    this.info("README.md");

    const data = templateGetReadmeTemplate(template);

    FileWriter.saveFile(path.join(this.outputDirectoryRoot, "README.md"), data);
  }

  generatePrismaSchema(template: GeneratorTemplateType): void {
    this.info("prisma.schema");

    const data = templateGetPrismaSchemaTemplate(template);

    FileWriter.saveFile(
      path.join(this.outputDirectoryRoot, "prisma/schema.prisma"),
      data
    );
  }

  copyFiles(): void {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { default: _, ...filesToCopy } =
      templateListFromJson as AssociativeArray<string[]>;

    logger.info("Copying files...");

    for (const [location, fileList] of Object.entries(filesToCopy)) {
      const directory = path.join(this.outputDirectoryRoot, location);
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
