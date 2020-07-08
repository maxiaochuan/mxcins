import less from 'less';
import { antdPath } from './utils';
import { VariablesOutput } from './plugins';

export default async (vars: Record<string, string>) => {
  const content = `
    @import "lib/style/themes/default.less";
  `;

  const output = await less.render(content, {
    javascriptEnabled: true,
    paths: [antdPath],
    modifyVars: vars,
    compress: true,
    plugins: [new VariablesOutput({})],
  });

  return JSON.parse(output.css);
};
