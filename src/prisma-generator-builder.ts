import { GeneratorTemplateType, PackageJsonTemplateType } from "./lib/types";

import { FileGenerator } from "./generator/component/file-generator/file-generator";

class PrismaGeneratorBuilder {
  private readonly outputDirectoryRoot: string;
  private _fileGenerator?: FileGenerator;

  constructor(outputDirectory = "./build") {
    this.outputDirectoryRoot = outputDirectory;
  }

  private get fileGenerator() {
    if (!this._fileGenerator) {
      this._fileGenerator = new FileGenerator(this.outputDirectoryRoot);
    }

    return this._fileGenerator;
  }

  build(): void {
    this.generateGeneratorTs();
    this.generatePackageJson();
    this.generateBinTs();
    this.copyFiles();
  }

  private copyFiles() {
    this.fileGenerator.copyFiles();
  }

  private generateGeneratorTs(template?: GeneratorTemplateType): void {
    const tpl = template || {
      provider: "provider",
      prettyName: "prettyName",
      defaultOutput: "defaultOutput",
    };

    this.fileGenerator.generateGeneratorTs(tpl);
  }

  private generatePackageJson(template?: PackageJsonTemplateType): void {
    const tpl = template || {
      name: "example-generator",
      version: "1.0.0",
      author: "John Doe",
      description: "Prisma ORM Generator",
      license: "MIT",
    };

    this.fileGenerator.generatePackageJson(tpl);
  }

  private generateBinTs(): void {
    this.fileGenerator.generateBinTs();
  }
}

export default PrismaGeneratorBuilder;
