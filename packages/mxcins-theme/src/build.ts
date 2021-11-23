import path from 'path';
import less from 'less';

const build = async (vars: Record<string, string>): Promise<string> => {
  // eslint-disable-next-line unicorn/prefer-module
  const antdPackagePath = require.resolve('antd/package.json');
  const antdPath = path.dirname(antdPackagePath);

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
