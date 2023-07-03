# prisma-generator-builder

Creates very basic `prisma generator`, ready to run and to be extended.

### Folder structure

```
<project root>
└──<example-generator>
    └──src
        ├── bin.ts
        └── generator            
             ├── helper
             ├    ├── helper.file-writer.ts
             └── generator.ts            
        ├── package.json
        └── README.md
```

## Usage

```
npx ts-node src/bin.ts 
```

```
npx tsx src/bin.ts 
```

Now, set up your `prisma.schema` and add your custom generator.
This way it can be executed when running `npx prisma generate`.


### Schema setup

Depending on if you are using `ts-node` or `tsx`,
and whenever you are using path aliases,
there are few configuration options. 

Assuming the generator files were generated under `src/generator/`.

#### schema.prisma with `ts-node`

```
generator prisma-generator-example {
  provider = "ts-node  --transpile-only  ./src/generator/generator.ts"
  output   = "./prisma-generator-example"
}

```

#### schema.prisma with `ts-node` and path aliases

```
generator prisma-generator-example {
  provider = "ts-node -r tsconfig-paths/register --transpile-only  ./src/generator/generator.ts"
  output   = "./prisma-generator-example"
}

```

Note: You'll need to install `tsconfig-paths` package.

#### schema.prisma with `tsx`

```
generator prisma-generator-example {
  provider = "tsx ./src/generator/generator.ts"
  output   = "./prisma-generator-example"
}
```

## Usage of custom generator

Run `npx prisma generate` to execute `prisma-generator-example`.

Output:

```
✔ Generated Prisma Client (4.16.2 | library) to .\node_modules\@prisma\client in 71ms

✔ Generated Example Generator (1.0.0) to .\prisma\example-generator in 36ms

You can now start using Prisma Client in your code. Reference: https://pris.ly/d/client
```

## Developing your custom generator

To get started right away, you can use the default helper, or create your own.

### Helpers

From `helper.file-writer.ts` you can import `FileWriter` helper and use it in your generator.
It offers two methods.

`saveFile()` - to save any file
```ts
import FileWriter from "./helper/helper.file-writer";

FileWriter.saveFile("foo.txt", `foo`);
```


`saveTypescriptFile()` - to save and format TS file 

```ts
import FileWriter from "./helper/helper.file-writer";

FileWriter.saveTypescriptFile("foo.ts", `const foo="foo"; console.log(foo);`);
```
