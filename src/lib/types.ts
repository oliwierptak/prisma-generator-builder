import PrismaGeneratorBuilderPluginInterface from "../component/generator/plugin-interface";

interface AssociativeArray<T> {
  [key: string]: T;
}

type GeneratorConfigType = {
  outputDirectoryRoot: string;
  plugins: PrismaGeneratorBuilderPluginInterface[];
};

type PrismaGeneratorTemplateType = {
  provider: string;
  prettyName: string;
  defaultOutput: string;
};

type PackageJsonTemplateType = {
  name: string;
  version: string;
  author: string;
  description: string;
  license: string;
};

type ReadmeTemplateType = PrismaGeneratorTemplateType & PackageJsonTemplateType;
type PrismaGeneratorBuilderConfig = ReadmeTemplateType & GeneratorConfigType;

export {
  AssociativeArray,
  PrismaGeneratorTemplateType,
  PackageJsonTemplateType,
  ReadmeTemplateType,
  PrismaGeneratorBuilderConfig,
};
