import PluginBin from "./plugin/plugin.bin";
import PluginGenerator from "./plugin/plugin.generator";
import PluginPackageJson from "./plugin/plugin.package-json";
import PluginPrismaSchema from "./plugin/plugin.prisma-schema";
import PluginReadme from "./plugin/plugin.readme";
import { PluginCopyFiles } from "./plugin/plugin.copy-files";

export class PluginContainer {
  static get plugins() {
    return [
      new PluginBin(),
      new PluginGenerator(),
      new PluginPackageJson(),
      new PluginPrismaSchema(),
      new PluginReadme(),
      new PluginCopyFiles(),
    ];
  }
}
