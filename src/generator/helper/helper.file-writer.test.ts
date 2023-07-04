import { describe, expect, test } from "@jest/globals";
import FileWriter from "./helper.file-writer";
import fs from "fs";

jest.mock("fs");

beforeEach(() => jest.clearAllMocks());

describe("FileWriter Helper", () => {
  test("saveFile() should save file", async () => {
    FileWriter.saveFile("lorem/ipsum/filename.json", "Lorem Ipsum");

    expect(fs.mkdirSync).toHaveBeenCalledWith("lorem/ipsum", {
      recursive: true,
    });

    expect(fs.writeFileSync).toHaveBeenCalledWith(
      "lorem/ipsum/filename.json",
      "Lorem Ipsum"
    );
  });
});
