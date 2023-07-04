import FileWriter from "./helper.file-writer";
import { DMMF } from "@prisma/client/runtime";
import path from "path";
import { logger } from "@prisma/internals";
import Datamodel = DMMF.Datamodel;

export class HelloWorld {
  debugDataModel(datamodel: Datamodel, filename: string) {
    const output = path.join(filename, "data-model.json");

    FileWriter.saveFile(output, JSON.stringify(datamodel));

    logger.info("Generated datamodel under: data-model.json");

    return HelloWorld;
  }

  hi(name: string) {
    logger.info("Hello World from " + name);

    return HelloWorld;
  }
}
