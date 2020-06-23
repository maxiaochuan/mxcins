import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import rimraf from 'rimraf';
import mkdirp from 'mkdirp';
import less from 'less';

export interface IOpts {
  outputPath: string;
}

const DEFAULT_OPTS: IOpts = {
  outputPath: join(process.cwd(), '.temp'),
  // modifyVarsArray: [],
};

const asyncRender = async (modifyVars: Record<string, string>) => {
  const antdPackagePath = require.resolve('antd/package.json');
  const antdPath = dirname(antdPackagePath);

  const content = `
    @import "lib/style/themes/default.less";
    @import "lib/style/core/index.less";
    @import "lib/style/components.less";
  `;

  const output = await less.render(content, {
    javascriptEnabled: true,
    paths: [antdPath],
    modifyVars,
    compress: true,
  });

  return output.css;
};

const build = async (
  opts: IOpts,
  configs: { fileName: string; modifyVars: Record<string, string> }[],
) => {
  const { outputPath } = { ...DEFAULT_OPTS, ...opts };
  // mkdir
  rimraf.sync(outputPath);
  mkdirp.sync(outputPath);

  const copy = [...configs];

  while (copy.length) {
    const config = copy.pop();
    if (config) {
      // eslint-disable-next-line no-await-in-loop
      const css = await asyncRender(config.modifyVars);
      writeFileSync(join(outputPath, config.fileName), css);
    }
  }
};

export default build;
