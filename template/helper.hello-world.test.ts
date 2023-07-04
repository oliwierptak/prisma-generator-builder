import { describe, expect, test } from "@jest/globals";
import { HelloWorld } from "./helper.hello-world";
import { logger } from "@prisma/internals";

jest.mock("@prisma/internals");

beforeEach(() => jest.clearAllMocks());

describe("HelloWorld Helper", () => {
  test("hi() should use prisma logger to generate output", async () => {
    const loggerSpy = jest
      .spyOn(logger, "info")
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .mockImplementationOnce(() => {});

    const helloWorld = new HelloWorld();
    helloWorld.hi("test-location");

    expect(loggerSpy).toBeCalledWith("Hello World from test-location");
  });
});
