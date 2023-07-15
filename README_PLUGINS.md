# prisma-generator-builder plugins

Custom generator logic can be provided via additional plugins.

### Contract

```typescript
interface PrismaGeneratorBuilderPluginInterface {
  readonly location: string;

  run(config: PrismaGeneratorBuilderConfig): void;
}
```

### Implementation Example

Plugin example that generates `example.ts` script.

`plugin.example.ts`
```typescript
class PluginExample
  extends AbstractPlugin
  implements PrismaGeneratorBuilderPluginInterface {
  public readonly location = "example.ts";

  protected loadTemplate(template: PrismaGeneratorBuilderConfig): string {
    return `// generated script example for ${template.name}
console.log("${template.prettyName}");
`;
  }
}
```

`example.ts`
```typescript
// generated script example for prisma-generator-example
console.log("Prisma Generator Example");
```

See [abstract.plugin.ts here](src%2Fcomponent%2Fgenerator-plugin%2Fabstract.plugin.ts).

### Configuration options

Default configuration options.

To use additional plugins add them to `plugins` collection.
This collection can be set up as required.

```typescript
const config: PrismaGeneratorBuilderConfig = {
  provider: "provider",
  prettyName: "prettyName",
  defaultOutput: "defaultOutput",
  name: "prisma-generator-example",
  version: "1.0.0",
  author: "John Doe",
  description: "Prisma ORM Generator",
  license: "MIT",
  outputDirectoryRoot: "./build",
  plugins: [...],
};
```

- #### provider
    Prisma provider name

- #### prettyName
    Prisma pretty name for generator

- #### defaultOutput
    Prisma generator output directory relative to `<project root>prisma/` directory.

- #### name, version, author, description, license
    Values for `package.json`


- #### outputDirectoryRoot
    Root path for generated files


- #### plugins
    Set of plugins implementing `PrismaGeneratorBuilderPluginInterface`.


### Default plugins

- `PluginBin` : generates `bin.ts` script
- `PluginGenerator` : generates `generator.ts` script
- `PluginPackageJson` : generates `package.json` file
- `PluginPrismaSchema` : generates `schema.prisma` file
- `PluginReadme` : generates `README.md` file
- `PluginCopyFiles` : copies set of files without modification


### Usage

```typescript
import { PrismaGeneratorBuilder } from "@prisma-generator-builder";

const config: PrismaGeneratorBuilderConfig = {
  provider: "provider",
  prettyName: "prettyName",
  defaultOutput: "defaultOutput",
  name: "prisma-generator-example",
  version: "1.0.0",
  author: "John Doe",
  description: "Prisma ORM Generator",
  license: "MIT",
  outputDirectoryRoot: "./build",
  plugins: [
    new PluginBin(),
    new PluginGenerator(),
    new PluginPackageJson(),
    new PluginPrismaSchema(),
    new PluginReadme(),
    new PluginCopyFiles(),
  ],
};

PrismaGeneratorBuilder.run(config);
```

See [builder.test.ts](src/component/generator/builder.test.ts) for an example.
