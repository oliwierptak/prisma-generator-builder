import { PrismaGeneratorBuilderConfig } from "../../lib/types";

export default interface PrismaGeneratorBuilderPluginInterface {
  readonly location: string;

  run(config: PrismaGeneratorBuilderConfig): void;
}
