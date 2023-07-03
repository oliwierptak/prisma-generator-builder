interface AssociativeArray<T> {
  [key: string]: T;
}

type GeneratorTemplateType = {
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

export { AssociativeArray, GeneratorTemplateType, PackageJsonTemplateType };
