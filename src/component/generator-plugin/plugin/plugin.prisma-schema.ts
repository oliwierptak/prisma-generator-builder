import PrismaGeneratorBuilderPluginInterface from "../../generator/plugin-interface";
import { PrismaGeneratorTemplateType } from "../../../lib/types";
import AbstractPlugin from "../abstract.plugin";

export default class PluginPrismaSchema
  extends AbstractPlugin
  implements PrismaGeneratorBuilderPluginInterface
{
  public readonly location = "prisma/schema.prisma";

  protected loadTemplate(template: PrismaGeneratorTemplateType): string {
    return `// Data source
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

// Generator
generator client {
  provider        = "prisma-client-js"
}

generator ${template.provider} {
  provider = "ts-node  --transpile-only  ./src/generator/generator.ts"
  output   = "${template.defaultOutput}"
}

// Data model
model Post {
  id        Int     @id @default(autoincrement())
  title     String
  content   String?
  published Boolean @default(false)
  author    User?   @relation(fields: [authorId], references: [id])
  authorId  Int?
}

model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  posts Post[]
}
`;
  }
}
