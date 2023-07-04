# prisma-generator-builder

Creates very basic `prisma generator`, ready to run and to be extended.

### Folder structure

```
<project root>
└──src
    ├── bin.ts
    └── generator
         ├── component
         ├    ├── hello-world.test.ts
         ├    ├── hello-world.ts
         ├── helper
         ├    ├── helper.file-writer.ts
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

The default output folder is under `./build`.

```
cd ./build
npm install
```

Now, set up `prisma.schema` and add custom generator.
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

## Custom generator usage

Run `npx prisma generate`


```
prisma:info Hello World from prettyName
prisma:info Generated datamodel under: data-model.json

✔ Generated Prisma Client (4.16.2 | library) to .\node_modules\@prisma\client in 82ms

✔ Generated prettyName (1.0.0) to .\prisma\prisma-generator-example in 39ms
You can now start using Prisma Client in your code. Reference: https://pris.ly/d/client
```

## Custom generator development

To get started right away, use the default component, or create new one.

### Component

The generator uses very basic `HelloWorld` example component, 
ensuring that prisma and custom generator logic are not mixed together. 
This way it will be easier to migrate to future versions of prisma.
See [generator.ts](src/generator/generator.ts) example.

### Helper

`FileWriter` class can be imported from `helper.file-writer.ts`, it has two methods.

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

`npx jest`

```
 PASS  src/generator/component/hello-world.test.ts
  Hello World
    √ hi() should use prisma logger to generate output (3 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        2.521 s, estimated 3 s
Ran all test suites.
```
