import PrismaGeneratorBuilderPluginInterface from "../../generator/plugin-interface";
import AbstractPlugin from "../abstract.plugin";
import { PrismaGeneratorBuilderConfig } from "../../../lib/types";

export default class PluginReadme
  extends AbstractPlugin
  implements PrismaGeneratorBuilderPluginInterface
{
  public readonly location = "README.md";

  protected loadTemplate(template: PrismaGeneratorBuilderConfig): string {
    return `# ${template.provider} 

${template.prettyName} v${template.version}.

### Schema setup

#### schema.prisma with \`ts-node\` (default)

\`\`\`
generator ${template.provider} {
  provider = "ts-node  --transpile-only  ./src/generator/generator.ts"
  output   = "./${template.defaultOutput}"
}
\`\`\`

#### schema.prisma with \`ts-node\` and path aliases

\`\`\`
generator ${template.provider} {
  provider = "ts-node -r tsconfig-paths/register --transpile-only  ./src/generator/generator.ts"
  output   = "./${template.defaultOutput}"
}
\`\`\`

Note: You'll need to install \`tsconfig-paths\` package.

#### schema.prisma with \`tsx\`

\`\`\`
generator ${template.provider} {
  provider = "tsx ./src/generator/generator.ts"
  output   = "./${template.defaultOutput}"
}
\`\`\`

## ${template.provider} usage

Run \`npx prisma generate\`
`;
  }
}
