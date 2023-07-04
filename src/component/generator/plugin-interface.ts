import { PrismaGeneratorBuilderConfig } from "../../lib/types";

export default interface PrismaGeneratorBuilderPluginInterface {
  readonly location: string;

  generate(config: PrismaGeneratorBuilderConfig): void;
}
