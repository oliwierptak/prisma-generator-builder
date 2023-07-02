# prisma-generator-builder

Creates very basic `prisma generator`, ready to run and to be extended.

### Folder structure

```
<project root>
└──<example-generator>
    └──src
        ├── index.js
        ├── bin.js
        ├── package.json
        └── generator.ts
```

## Install

```
npm i oliwierptak/prisma-generator-builder
```

## Usage

```
npx prisma-generator-builder 
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
generator example-generator {
  provider = "ts-node  --transpile-only  ./src/generator/generator.ts"
  output   = "./example-generator"
}

```

#### schema.prisma with `ts-node` and path aliases

```
generator example-generator {
  provider = "ts-node -r tsconfig-paths/register --transpile-only  ./src/generator/generator.ts"
  output   = "./example-generator"
}

```

Note: You'll need to install `tsconfig-paths` package.

#### schema.prisma with `tsx`

```
generator example-generator {
  provider = "tsx ./src/generator/generator.ts"
  output   = "./example-generator"
}
```

Run `npx prisma generate` to execute `example-generator`.

Output:

```
✔ Generated Prisma Client (4.16.2 | library) to .\node_modules\@prisma\client in 71ms

✔ Generated Example Generator (1.0.0) to .\prisma\example-generator in 36ms

You can now start using Prisma Client in your code. Reference: https://pris.ly/d/client
```
