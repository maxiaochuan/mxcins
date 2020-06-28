import { IApi } from 'umi';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import serveStatic from 'serve-static';
import { join } from 'path';
import { camelcaseKeys as camel } from '@mxcins/utils';
import build from './build';

export interface IDynamicTheme extends Partial<Record<string, Record<string, string>>> {
  default?: Record<string, string>;
}

export interface IDynamicThemeConfig {
  theme: IDynamicTheme;
}

export default (api: IApi) => {
  const { paths, utils } = api;
  if (!paths.cwd || !paths.absNodeModulesPath || !paths.absOutputPath) {
    return;
  }
  const { winPath, rimraf, mkdirp } = utils;

  // theme.config.json
  const themeConfigPath = winPath(join(paths.cwd, 'config', 'theme.config.json'));
  if (!existsSync(themeConfigPath)) {
    return;
  }

  const conf: IDynamicThemeConfig = JSON.parse(readFileSync(themeConfigPath, 'utf-8'));
  const { theme } = conf;

  api.modifyDefaultConfig(memo => {
    return {
      ...memo,
      theme: theme.default,
    };
  });

  // development
  const devThemeTempPath = winPath(join(paths.absNodeModulesPath, '.plugin-theme'));
  api.addMiddewares(() => {
    return serveStatic(devThemeTempPath);
  });

  api.addHTMLHeadScripts(() => [
    {
      content: `window.dynamic_theme = ${JSON.stringify(camel(theme, { deep: true }))}`,
    },
  ]);

  try {
    if (existsSync(devThemeTempPath)) {
      rimraf.sync(devThemeTempPath);
    }
    if (existsSync(winPath(join(devThemeTempPath, 'theme')))) {
      rimraf.sync(winPath(join(devThemeTempPath, 'theme')));
    }
    mkdirp.sync(devThemeTempPath);
    mkdirp.sync(winPath(join(devThemeTempPath, 'theme')));
  } catch (error) {
    // console.log(error);
  }

  api.onDevCompileDone(() => {
    api.logger.info('build theme');

    const cachePath = winPath(join(devThemeTempPath, 'cache.json'));
    if (!existsSync(cachePath)) {
      writeFileSync(cachePath, '');
    }

    const current = JSON.stringify(theme);
    const cache = readFileSync(cachePath, 'utf-8');
    if (cache !== current) {
      api.logger.info(`themes changed`);
      build(
        { outputPath: winPath(join(devThemeTempPath, 'theme')) },
        Object.keys(theme)
          .filter(k => k !== 'default')
          .map(k => ({
            fileName: `${k}.css`,
            modifyVars: theme[k] || {},
          })),
      ).then(() => {
        api.logger.info('build theme success');
        writeFileSync(cachePath, current);
      });
    } else {
      api.logger.log('use cache');
    }
  });

  // production
  const outputPath = `${paths.absOutputPath}/theme`;

  // api.addMiddewares(() => {
  //   return serveStatic()
  // })

  api.onBuildComplete(({ err }) => {
    if (err) {
      return;
    }

    api.logger.info('build theme');
    try {
      if (existsSync(winPath(join(outputPath, 'theme')))) {
        rimraf.sync(winPath(join(outputPath, 'theme')));
      }
      mkdirp.sync(winPath(join(outputPath, 'theme')));
    } catch (error) {
      // console.log(error);
    }

    build(
      { outputPath },
      Object.keys(theme)
        .filter(k => k !== 'default')
        .map(k => ({
          fileName: `${k}.css`,
          modifyVars: theme[k] || {},
        })),
    ).then(() => {
      api.logger.info('build theme success');
    });
  });
};
