import { dirname } from 'path';
import less from 'less';

const build = async (vars: Record<string, string>) => {
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
    modifyVars: vars,
    compress: true,
  });

  return output.css;
};

export default build;
