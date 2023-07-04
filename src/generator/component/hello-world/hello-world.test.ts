import { describe, expect, test } from "@jest/globals";
import { HelloWorld } from "./hello-world";
import { logger } from "@prisma/internals";

jest.mock("@prisma/internals");

beforeEach(() => jest.clearAllMocks());

describe("Hello World", () => {
  test("hi() should use prisma logger to generate output", async () => {
    const dbSetSpy = jest
      .spyOn(logger, "info")
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .mockImplementationOnce(() => {});

    const helloWorld = new HelloWorld();
    helloWorld.hi("test-name");

    expect(dbSetSpy).toBeCalledWith("Hello World from test-name");
  });
});
