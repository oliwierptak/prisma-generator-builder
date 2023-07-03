#!/usr/bin/env node
import PrismaGeneratorBuilder from "./prisma-generator-builder";

const builder = new PrismaGeneratorBuilder("../prisma-generator-example/");
builder.build();
