import { IApi } from 'umi';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import serveStatic from 'serve-static';
import { join } from 'path';
import build from './build';

export default (api: IApi) => {
  const { paths } = api;
  if (!paths.cwd || !paths.absNodeModulesPath || !paths.absOutputPath) {
    return;
  }
  const { winPath, rimraf, mkdirp } = api.utils;
  const themeConfigPath = winPath(join(paths.cwd, 'config/theme.config.json'));
  if (!existsSync(themeConfigPath)) {
    return;
  }
  const parsed = JSON.parse(readFileSync(themeConfigPath, 'utf-8'));
  const themes = parsed.theme;
  // development
  const themeTempPath = winPath(join(paths.absNodeModulesPath, '.plugin-theme'));
  api.addMiddewares(() => {
    return serveStatic(themeTempPath);
  });
  api.onDevCompileDone(() => {
    api.logger.info(`cache in: ${themeTempPath}`);
    api.logger.info('build theme');

    try {
      if (existsSync(themeTempPath)) {
        rimraf.sync(themeTempPath);
      }
      if (existsSync(winPath(join(themeTempPath, 'theme')))) {
        rimraf.sync(winPath(join(themeTempPath, 'theme')));
      }
      mkdirp.sync(themeTempPath);
      mkdirp.sync(winPath(join(themeTempPath, 'theme')));
    } catch (error) {
      // console.log(error);
    }

    const cachePath = winPath(join(themeTempPath, 'cache.json'));
    if (!existsSync(cachePath)) {
      writeFileSync(cachePath, '');
    }
    const current = readFileSync(themeConfigPath, 'utf-8');
    const cache = readFileSync(cachePath, 'utf-8');
    if (cache !== current) {
      build(
        { outputPath: winPath(join(themeTempPath, 'theme')) },
        Object.keys(themes).map(k => ({
          fileName: `${k}.css`,
          modifyVars: themes[k],
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
      Object.keys(themes).map(k => ({
        fileName: `${k}.css`,
        modifyVars: themes[k],
      })),
    ).then(() => {
      api.logger.info('build theme success');
    });
  });
};
