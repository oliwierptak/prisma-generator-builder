# prisma-generator-builder

Creates simple and ready to run `prisma generator` package with configured:

- typescript
- prisma
- eslint
- prettier
- jest

### Folder structure

```
<project root>
└──src
    ├── bin.ts
    └── generator
         ├── helper
         ├    ├── helper.file-writer.test.ts
         ├    ├── helper.file-writer.ts
         ├    ├── helper.hello-world.test.ts
         ├    ├── helper.hello-world.ts         
         └── generator.ts            
    ├── package.json
    ...
    └── README.md
```

## Usage

```
npx ts-node src/bin.ts 
```

```
npx tsx src/bin.ts 
```

The default output folder is under `../prisma-generator-example/`.

```
cd ../prisma-generator-example/
npm install
```

Check `README.md` in the generated `../prisma-generator-example/` folder to see how to easily setup `prisma.schema`.

### Schema setup

A custom generator must be added to `prisma.schema` in order for it be executed with `npx prisma generate`.

Depending on if you are using `ts-node` or `tsx`, and whenever you are using path aliases,
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

Note: `tsconfig-paths` package is required here.

#### schema.prisma with `tsx`

```
generator prisma-generator-example {
  provider = "tsx ./src/generator/generator.ts"
  output   = "./prisma-generator-example"
}
```

Note: These blocks are auto generated and placed in generated `README.md`.

## Custom generator usage

Run `npx prisma generate`


```
prisma:info Hello World from prisma-generator-example
prisma:info Generated datamodel under: data-model.json

✔ Generated Prisma Client (4.16.2 | library) to .\node_modules\@prisma\client in 82ms

✔ Generated Prisma Generator Example (1.0.0) to .\prisma\prisma-generator-example in 39ms
You can now start using Prisma Client in your code. Reference: https://pris.ly/d/client
```

## Custom generator development

Prisma generators usually generate files, and to help with that there are two helper classes.


### HelloWorld Helper

The generator uses very basic `HelloWorld` helper, ensuring that prisma and custom generator
logic are not mixed together. This way, it will be easier to migrate to future versions of prisma.

To see the example check [generator.ts](src/generator/generator.ts) example.


### FileWriter Helper

`saveFile()` - saves any file
```ts
import FileWriter from "./helper/helper.file-writer";

FileWriter.saveFile("foo.txt", `foo`);
```


`saveTypescriptFile()` - saves and formats TS file 

```ts
import FileWriter from "./helper/helper.file-writer";

FileWriter.saveTypescriptFile("foo.ts", `const foo="foo"; console.log(foo);`);
```

### Tests

Generated package comes together with pre-configured `jest`.

`npx jest`

```
 PASS  src/generator/component/helper.hello-world.test.ts
  Hello World
    √ hi() should use prisma logger to generate output (3 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        2.521 s, estimated 3 s
Ran all test suites.
```
