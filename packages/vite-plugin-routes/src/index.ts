import type { Plugin, ResolvedConfig } from 'vite';
import * as path from 'path';
import * as fs from 'fs';

const OUTPUT_DIR = 'src/.mx';

export default function routes(): Plugin {
  const packagePath = path.join(__dirname, '../package.json')
  const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf-8'));
  let conf: ResolvedConfig;
  return {
    name: pkg.name,
    configResolved(resolvedConfig) {
      conf = resolvedConfig;
    },
    buildStart() {
      const outputPath = path.join(conf.root, OUTPUT_DIR);
    }
  }
}

