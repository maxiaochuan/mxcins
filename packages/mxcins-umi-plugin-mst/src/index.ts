import { existsSync, readFileSync, statSync } from 'fs';
import globby from 'globby';
import { basename, dirname, extname, join } from 'path';
import isRoot from 'path-is-root';
import { IApi, IRoute } from 'umi-types';
import { chunkName, findJS } from './utils';

interface IRewriteApi extends IApi {
  writeTmpFile: any;
}

export function getStores(cwd: string, api: IRewriteApi) {
  return globby
    .sync(`./stores/**/*.{ts,tsx,js,jsx}`, {
      cwd,
    })
    .filter(
      p =>
        !p.endsWith('.d.ts') &&
        !p.endsWith('.test.js') &&
        !p.endsWith('.test.jsx') &&
        !p.endsWith('.test.ts') &&
        !p.endsWith('.test.tsx'),
    )
    .map(p => api.winPath(join(cwd, p)));
}

function getStoresWithRoutes(routes: IRoute[], api: IRewriteApi): string[] {
  const { paths } = api;
  const init: string[] = [];
  return routes.reduce(
    (memo, route) => [
      ...memo,
      ...(route.component && route.component.indexOf('() =>') !== 0
        ? getPageStores(join(paths.cwd, route.component), api)
        : []),
      ...(route.routes ? getStoresWithRoutes(route.routes, api) : []),
    ],
    init,
  );
}
export function getGlobalStores(api: IRewriteApi, shouldImportDynamic?: boolean) {
  const { paths, routes } = api;
  let stores = getStores(paths.absSrcPath, api);
  if (!shouldImportDynamic) {
    // 不做按需加载时，还需要额外载入 page 路由的 models 文件
    stores = [...stores, ...getStoresWithRoutes(routes, api)];
    // 去重
    stores = [...new Set(stores)];
  }
  return stores;
}

export function getPageStores(cwd: string, api: IRewriteApi) {
  let stores: any[] = [];
  while (!isPagesPath(cwd, api) && !isSrcPath(cwd, api) && !isRoot(cwd)) {
    if (existsSync(cwd) && !statSync(cwd).isFile()) {
      stores = stores.concat(getStores(cwd, api));
    }
    cwd = dirname(cwd);
  }
  return stores;
}
function isPagesPath(path: string, api: IRewriteApi) {
  const { paths, winPath } = api;
  return endWithSlash(winPath(path)) === endWithSlash(winPath(paths.absPagesPath));
}
function endWithSlash(path: string) {
  return path.slice(-1) !== '/' ? `${path}/` : path;
}
function isSrcPath(path: string, api: IRewriteApi) {
  const { paths, winPath } = api;
  return endWithSlash(winPath(path)) === endWithSlash(winPath(paths.absSrcPath));
}

interface IOpts {
  dynamicImport?: {
    loadingComponent?: string;
    webpackChunkName?: boolean;
  };
  exclude?: any[];
}

/**
 * 2019-02-28 16:31:35 暂时无法支持dynamic 正在寻找解决方案
 * @param api
 * @param opts
 */
export default function(api: IRewriteApi, opts: IOpts = {}) {
  const { paths, winPath } = api;
  // const shouldImportDynamic = !!opts.dynamicImport;
  const shouldImportDynamic = false;

  // api.modifyAFWebpackOpts(memo => {
  //   return {
  //     ...memo,
  //     disableDynamicImport: false,
  //   };
  // });

  function getMobxJs() {
    const mobxJs = findJS(paths.absSrcPath, 'mobx');
    if (mobxJs) {
      return winPath(mobxJs);
    }
  }
  function getStoreName(store: string) {
    const storeArr = winPath(store).split('/');
    return storeArr[storeArr.length - 1];
  }
  function exclude(stores: string[], excludes: any[]) {
    return stores.filter(store => {
      const name = getStoreName(store);
      for (const exc of excludes) {
        if (typeof exc === 'function' && exc(name)) {
          return false;
        }
        if (exclude instanceof RegExp && exc.test(name)) {
          return false;
        }
      }
      return true;
    });
  }
  function getGlobalStoresContent() {
    return exclude(getGlobalStores(api, shouldImportDynamic), opts.exclude || [])
      .map(path => ({ name: basename(path, extname(path)), path }))
      .filter(_ => _.name)
      .map(({ name, path }) => `"${name}": types.optional(require('${path}').default,{}),`.trim())
      .join('\r\n');
  }
  function generateMobxContainer() {
    const tpl = join(__dirname, '../templates/MobxContainer.js');
    const tplContent = readFileSync(tpl, 'utf-8');
    api.writeTmpFile('MobxContainer.js', tplContent);
  }
  function generateInitMobx() {
    const tpl = join(__dirname, '../templates/initMobx.js');
    let tplContent = readFileSync(tpl, 'utf-8');

    const mobxJs = getMobxJs();

    if (mobxJs) {
      tplContent = tplContent.replace(
        '<%= MobxConfigure %>',
        `
...((require('${mobxJs}').config || (() => ({})))()),
        `.trim(),
      );
    } else {
      tplContent = tplContent.replace('<%= MobxConfigure %>', '');
    }

    tplContent = tplContent.replace('<%= RegisterStores %>', getGlobalStoresContent());
    api.writeTmpFile('initMobx.js', tplContent);
  }

  api.onGenerateFiles(() => {
    generateMobxContainer();
    generateInitMobx();
  });

  // TODO: dynamicImport
  if (shouldImportDynamic) {
    api.addRouterImport({
      source: '@mxcins/umi-plugin-mst/lib/dynamic',
      specifier: '_mobxDynamic',
    });

    api.modifyRouteComponent((memo, args) => {
      if (!args) {
        return;
      }
      const { importPath, webpackChunkName } = args;
      if (!webpackChunkName) {
        return memo;
      }
      let loadingOpts = '';
      if (opts.dynamicImport && opts.dynamicImport.loadingComponent) {
        loadingOpts = `loading: require('${winPath(
          join(paths.absSrcPath, opts.dynamicImport.loadingComponent),
        )}').default,`;
      }
      let extendStr = '';
      if (opts.dynamicImport && opts.dynamicImport.webpackChunkName) {
        extendStr = `/* webpackChunkName: ^${webpackChunkName}^ */`;
      }

      let ret = `
      _mobxDynamic({
  <%= STORES %>
        component: () => import(${extendStr}'${importPath}'),
        ${loadingOpts}
      })
      `.trim();
      const stores = getPageStores(join(paths.absTmpDirPath, importPath), api)
        .map(path => ({ name: basename(path, extname(path)), path }))
        .filter(_ => _.name);

      if (stores && stores.length) {
        ret = ret.replace(
          '<%= STORES %>',
          `
stores: () => [
  ${stores
    .map(
      store =>
        `import(${
          opts.dynamicImport && opts.dynamicImport.webpackChunkName
            ? `/* webpackChunkName: '${chunkName(paths.cwd, store.path, api.winPath)}' */`
            : ''
        }'${store.path}').then(m => { return { name: '${store.name}', instance: m.default }})`,
    )
    .join(',\r\n  ')}
],
      `.trim(),
        );
      }
      return ret.replace('<%= STORES %>', '');
    });
  }

  // const mobxDir = compatDirname(
  //   'mobx/package.json',
  //   cwd,
  //   dirname(require.resolve('mobx/package.json')),
  // );

  // api.addVersionInfo([
  //   `mobx@${require(join(mobxDir, 'package.json')).version} (${mobxDir})`,
  //   `mobx-react@${require('mobx-react/package').version}`,
  //   `mobx-state-tree@${require('mobx-state-tree/package').version}`,
  //   `mobx-react-devtools@${require('mobx-react-devtools/package').version}`,
  //   `mobx-devtools-mst@${require('mobx-devtools-mst/package').version}`,
  // ])

  api.modifyAFWebpackOpts(memo => {
    const alias = {
      mobx: require.resolve('mobx'),
      'mobx-react': require.resolve('mobx-react'),
      'mobx-state-tree': require.resolve('mobx-state-tree'),
      'mobx-react-devtools': require.resolve('mobx-react-devtools'),
      'mobx-devtools-mst': require.resolve('mobx-devtools-mst'),
    };
    if (typeof memo !== 'undefined') {
      return {
        ...memo,
        alias: {
          ...memo.alias,
          ...alias,
        },
      };
    }
    return { alias };
  });

  api.addPageWatcher([
    join(paths.absSrcPath, 'stores'),
    join(paths.absSrcPath, 'store.js'),
    join(paths.absSrcPath, 'store.jsx'),
    join(paths.absSrcPath, 'store.ts'),
    join(paths.absSrcPath, 'store.tsx'),
    join(paths.absSrcPath, 'mobx.js'),
    join(paths.absSrcPath, 'mobx.jsx'),
    join(paths.absSrcPath, 'mobx.ts'),
    join(paths.absSrcPath, 'mobx.tsx'),
  ]);

  api.addRuntimePlugin(join(__dirname, './runtime'));
  api.addRuntimePluginKey('mobx');
  api.addEntryCodeAhead(
    `
require('@tmp/initMobx');
  `.trim(),
  );
}
