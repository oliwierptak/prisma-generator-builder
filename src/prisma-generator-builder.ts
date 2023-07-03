import getPackageJsonTemplate from "../template/package.json.template";
import FileWriter from "./generator/helper/helper.file-writer";
import { GeneratorTemplateType, PackageJsonTemplateType } from "./lib/types";
import getGeneratorTemplate from "../template/generator.template";
import LoggerInterface from "./logger/logger.interface";
import { logger as prismaLogger } from "@prisma/internals";

class PrismaGeneratorBuilder {
  private _logger?: LoggerInterface;
  private readonly outputDirectoryRoot: string;

  constructor(outputDirectory = "./build/", logger?: LoggerInterface) {
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
    this.logger.info("Building: generator.ts");

    const tpl = template || {
      provider: "provider",
      prettyName: "prettyName",
      defaultOutput: "defaultOutput",
    };

    const result = getGeneratorTemplate(tpl);

    FileWriter.saveTypescriptFile(
      this.outputDirectoryRoot + "/src/generator/generator.ts",
      result
    );
  }

  private generatePackageJson(template?: PackageJsonTemplateType): void {
    this.logger.info("Building: package.json");

    const tpl = template || {
      name: "example-generator",
      version: "1.0.0",
      author: "John Doe",
      description: "Prisma ORM Generator",
      license: "MIT",
    };

    const result = getPackageJsonTemplate(tpl);

    FileWriter.saveFile(this.outputDirectoryRoot + "/package.json", result);
  }

  private generateBinTs(): void {
    this.logger.info("Building: bin.ts");

    FileWriter.saveFile(
      this.outputDirectoryRoot + "/src/bin.ts",
      `#!/usr/bin/env node
import "./generator/generator";
`
    );
  }

  private copyFiles(): void {
    const files = [
      ".env",
      ".eslintrc.js",
      ".gitignore",
      ".npmrc",
      ".prettierrc",
      "jest.config.js",
      "README.md",
      "tsconfig.json",
    ];

    files.forEach((value) => {
      this.logger.info("Building: " + value);
      FileWriter.copyTemplateFile(value, this.outputDirectoryRoot);
    });

    this.logger.info("Building: helper.file-writer.ts");
    FileWriter.copyTemplateFile(
      "helper.file-writer.ts",
      this.outputDirectoryRoot + "/src/generator/helper/"
    );

    this.logger.info("Building: schema.prisma");
    FileWriter.copyTemplateFile(
      "schema.prisma",
      this.outputDirectoryRoot + "/prisma/"
    );
  }
}

export default PrismaGeneratorBuilder;
