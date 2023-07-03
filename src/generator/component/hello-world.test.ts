import { describe, expect, test } from "@jest/globals";
import { HelloWorld } from "./hello-world";
import { mock } from "jest-mock-extended";
import PrismaLoggerInterface from "../../logger/logger.interface";

describe("Hello World", () => {
  test("hi() should use prisma logger to generate output", async () => {
    const logger = mock<PrismaLoggerInterface>();
    const helloWorld = HelloWorld.instance(logger);

    helloWorld.hi("test-name");

    expect(logger.info).toBeCalledWith("Hello World from test-name");
  });
});
