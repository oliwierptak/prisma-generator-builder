import FileWriter from "../helper/helper.file-writer";
import { DMMF } from "@prisma/client/runtime";
import path from "path";
import PrismaLoggerInterface from "../../logger/logger.interface";
import Datamodel = DMMF.Datamodel;

export class HelloWorld {
  private static _instance: HelloWorld;
  private _logger: PrismaLoggerInterface;

  private constructor(logger: PrismaLoggerInterface) {
    this._logger = logger;
  }

  public static instance(logger: PrismaLoggerInterface) {
    return this._instance || (this._instance = new this(logger));
  }

  debugDataModel(datamodel: Datamodel, filename: string) {
    const output = path.join(filename, "data-model.json");

    FileWriter.saveFile(output, JSON.stringify(datamodel));

    this._logger.info("Generated datamodel under: data-model.json");

    return HelloWorld;
  }

  hi(name: string) {
    this._logger.info("Hello World from " + name);

    return HelloWorld;
  }
}
