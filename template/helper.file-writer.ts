import fs from "fs";
import * as path from "path";
import prettier from "prettier";

class FileWriter {
  static saveFile(writeLocation: string, content: string) {
    FileWriter.createPath(writeLocation);

    fs.writeFileSync(writeLocation, content);
  }

  static saveTypescriptFile(fileName: string, fileContent: string) {
    const promise = new Promise<string>((resolve, reject) =>
      prettier.resolveConfig(process.cwd()).then((options) => {
        if (!options) {
          resolve(fileContent);
        }

        try {
          const result = prettier.format(fileContent, {
            ...options,
            parser: "typescript",
          });

          resolve(result);
        } catch (error) {
          console.log(error);
          reject(error);
        }
      })
    );

    promise.then((value: string) => {
      FileWriter.saveFile(fileName, value);
    });
  }

  static copyTemplateFile(fileName: string, optionalTargetPath = ""): void {
    const sourcePath = path.join(__dirname, "../../../template", fileName);
    const targetPath = path.join(optionalTargetPath, fileName);

    FileWriter.createPath(targetPath);

    fs.writeFileSync(targetPath, fs.readFileSync(sourcePath, "utf-8"));
  }

  private static createPath(writeLocation: string) {
    fs.mkdirSync(path.dirname(writeLocation), {
      recursive: true,
    });
  }
}

export default FileWriter;
