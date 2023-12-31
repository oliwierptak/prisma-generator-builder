# prisma-generator-builder


Creates ready to run latest `prisma generator`.

Together with pre-configured packages, and pluggable architecture,
it creates project ready for prisma generator development.

### Preconfigured packages

- typescript
- prisma
- eslint
- prettier
- jest


### Pluggable architecture

Read more about [plugins here](README_PLUGINS.md).


## Installation

Install as dev dependency:

```
npm install prisma-generator-builder -D
```

## Usage

Run the builder to get started. 

```
npx prisma-generator-builder
```


<p><img src="configurator.png" width="450" /></p>


Switch to the output directory and run

```
npm install
npx prisma generate 
```

<p><img src="generator.png" width="520" /></p>

That's it.


## Requirements

Prisma ORM `version 5.x.x`.


## Custom Builder Development


### Project structure

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
         └── builder.ts            
    ├── package.json
    ...
    └── README.md
```


### Helpers

#### HelloWorld Helper

The generator uses very basic `HelloWorld` helper example.
However, thanks  to this separation, prisma and custom generator
logic are not mixed together.

To see the example check [builder.ts](src/generator/generator.ts).


#### FileWriter Helper

Handles file writing.

`saveFile()` - saves any file
```typescript
FileWriter.saveFile("foo.txt", `foo`);
```


`saveTypescriptFile()` - saves and formats typescript file 

```typescript
FileWriter.saveTypescriptFile("foo.ts", `const foo="foo"; console.log(foo);`);
```

### Tests

Generated package comes together with pre-configured `jest`.

`npx jest`

<p><img src="jest.png" width="420" /></p>
