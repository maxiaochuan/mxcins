import { join } from 'path';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import rimraf from 'rimraf';
import mkdirp from 'mkdirp';
import theme2vars from './theme2vars';
import build from './build';
// export type { IOpts as IbuildOpts } from './build';
// export { default as build } from './build';

// export { default as plugin } from './plugin';
export default async ({ input, output }: { input: string; output: string }) => {
  if (!existsSync(input)) {
    throw new Error(`input file: ${input} is not exist.`);
  }
  if (existsSync(output)) {
    rimraf.sync(output);
  }

  mkdirp.sync(output);

  const json: { theme: Record<string, Record<string, string>> } = JSON.parse(
    readFileSync(input, 'utf-8'),
  );
  const { theme } = json;

  const names = Object.keys(theme);

  const jsons: Record<string, any> = {};
  const csses: Record<string, any> = {};
  // theme to vars;
  // eslint-disable-next-line no-restricted-syntax
  for (const name of names) {
    // eslint-disable-next-line no-await-in-loop
    const transformed = await theme2vars({ ...theme[name], theme: name });
    // eslint-disable-next-line no-await-in-loop
    const css = await build(transformed);

    writeFileSync(join(output, `${name}.css`), css);
    writeFileSync(join(output, `${name}.json`), JSON.stringify(transformed, undefined, 2));
    jsons[name] = transformed;
    csses[name] = css;
  }

  return { jsons, csses };
};
