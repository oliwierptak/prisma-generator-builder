#!/usr/bin/env node
import PrismaGeneratorBuilder from "./prisma-generator-builder";

const builder = new PrismaGeneratorBuilder("../prisma-example-generator/");
builder.build();
