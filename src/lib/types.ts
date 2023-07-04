interface AssociativeArray<T> {
  [key: string]: T;
}

type GeneratorTemplateOptionType = {
  outputDirectoryRoot: string;
};

type PrismaGeneratorOptionTemplateType = {
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

type ReadmeTemplateType = PrismaGeneratorOptionTemplateType &
  PackageJsonTemplateType;
type GeneratorTemplateType = ReadmeTemplateType & GeneratorTemplateOptionType;

export {
  AssociativeArray,
  PrismaGeneratorOptionTemplateType,
  PackageJsonTemplateType,
  ReadmeTemplateType,
  GeneratorTemplateType,
};
