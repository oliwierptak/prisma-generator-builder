# ${template.name} 

${template.namePretty} v${template.version}.

### Schema setup

Depending on if you are using `ts-node` or `tsx`,
and whenever you are using path aliases,
there are few configuration options.

Assuming the generator files are under `src/generator/`.

#### schema.prisma with `ts-node`

```
generator ${template.name} {
  provider = "ts-node  --transpile-only  ./src/generator/generator.ts"
  output   = "./${template.defaultOutput}"
}
```

#### schema.prisma with `ts-node` and path aliases

```
generator ${template.name} {
  provider = "ts-node -r tsconfig-paths/register --transpile-only  ./src/generator/generator.ts"
  output   = "./${template.defaultOutput}"
}
```

Note: You'll need to install `tsconfig-paths` package.

#### schema.prisma with `tsx`

```
generator ${template.name} {
  provider = "tsx ./src/generator/generator.ts"
  output   = "./${template.defaultOutput}"
}
```

## ${template.name} usage

Run `npx prisma generate`

