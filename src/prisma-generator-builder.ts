import getPackageJsonTemplate from "../template/package.json.template";
import FileWriter from "./generator/helper/helper.file-writer";
import {
  AssociativeArray,
  GeneratorTemplateType,
  PackageJsonTemplateType,
} from "./lib/types";
import getGeneratorTemplate from "../template/generator.template";
import LoggerInterface from "./logger/logger.interface";
import { logger as prismaLogger } from "@prisma/internals";
import path from "path";
import * as templateListFromJson from "../template.json";

class PrismaGeneratorBuilder {
  private _logger?: LoggerInterface;
  private readonly outputDirectoryRoot: string;

  constructor(outputDirectory = "./build", logger?: LoggerInterface) {
    this._logger = logger;
    this.outputDirectoryRoot = outputDirectory;
  }

  private get logger() {
    if (!this._logger) {
      this._logger = prismaLogger;
    }
    return this._logger;
  }

  build(): void {
    this.generateGeneratorTs();
    this.generatePackageJson();
    this.generateBinTs();
    this.copyFiles();
  }

  private generateGeneratorTs(template?: GeneratorTemplateType): void {
    this.logger.info("Generating: generator.ts");

    const tpl = template || {
      provider: "provider",
      prettyName: "prettyName",
      defaultOutput: "defaultOutput",
    };

    const result = getGeneratorTemplate(tpl);

    FileWriter.saveTypescriptFile(
      path.join(this.outputDirectoryRoot, "src/generator/generator.ts"),
      result
    );
  }

  private generatePackageJson(template?: PackageJsonTemplateType): void {
    this.logger.info("Generating: package.json");

    const tpl = template || {
      name: "example-generator",
      version: "1.0.0",
      author: "John Doe",
      description: "Prisma ORM Generator",
      license: "MIT",
    };

    const result = getPackageJsonTemplate(tpl);

    FileWriter.saveFile(
      path.join(this.outputDirectoryRoot, "package.json"),
      result
    );
  }

  private generateBinTs(): void {
    this.logger.info("Generating: bin.ts");

    FileWriter.saveFile(
      path.join(this.outputDirectoryRoot, "src/bin.ts"),
      `#!/usr/bin/env node
import "./generator/generator";
`
    );
  }

  private copyFiles(): void {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { default: _, ...filesToCopy } =
      templateListFromJson as AssociativeArray<string[]>;

    this.logger.info("Copying files...");

    for (const [key, fileList] of Object.entries(filesToCopy)) {
      const directory = path.join(this.outputDirectoryRoot, key);
      fileList.forEach((file) => {
        this.logger.info(file);

        FileWriter.copyTemplateFile(file, directory);
      });
    }
  }
}

export default PrismaGeneratorBuilder;
