const { join, extname } = require('path');
const { existsSync, readdirSync } = require('fs');
const yParser = require('yargs-parser');
const babel = require('@babel/core');
const through = require('through2');
const rimraf = require('rimraf');
const vfs = require('vinyl-fs');
const chalk = require('chalk');
const slash = require('slash2');
const log = require('./utils/log');

const cwd = process.cwd();
let pkgCount = null;

function getBabelConfig(isBrowser) {
  const targets = isBrowser
    ? {
        browsers: ['last 2 versions', 'IE 10'],
      }
    : { node: 6 };
  return {
    presets: [
      require.resolve('@babel/preset-typescript'),
      [require.resolve('@babel/preset-env'), { targets }],
    ],
    plugins: [
      require.resolve('@babel/plugin-proposal-export-default-from'),
      require.resolve('@babel/plugin-proposal-class-properties'),
    ],
  };
}

function addLastSlash(path) {
  return path.slice(-1) === '/' ? path : `${path}/`;
}

function transform(opts = {}) {
  const { content, path, pkg, root } = opts;
  console.log('transform', content, path, pkg, root);

  const { browserFiles } = pkg.umiTools || {};
  const isBrowser =
    browserFiles && browserFiles.includes(slash(path).replace(`${addLastSlash(slash(root))}`, ''));

  const babelConfig = getBabelConfig(isBrowser);

  log.transform(chalk[isBrowser ? 'yellow' : 'blue'](`${slash(path).replace(`${cwd}/`, '')}`));
  return babel.transform(content, babelConfig).code;
}

function build(dir, opts = {}) {
  const { watch }= opts;
  const libDir = join(dir, 'lib');
  const srcDir = join(dir, 'src');

  const pkgPath = join(cwd, dir, 'package.json');
  const pkg = require(pkgPath);

  // delete lib
  rimraf.sync(libDir);

  function createStream(src) {
    return vfs
      .src([src], { allowEmpty: true, base: srcDir })
      .pipe(
        through.obj((f, env, cb) => {
          if (extname(f.path) === '.ts') {
            f.contents = Buffer.from(
              transform({
                content: f.contents,
                pkg,
                path: f.path,
              root: join(cwd, dir),
              }),
            );
          }
          cb(null, f);
        }),
      )
      .pipe(vfs.dest(libDir));
  }

  const stream = createStream(join(srcDir, '**/*'));
  stream.on('end', () => {
    pkgCount -= 1;
    if (pkgCount === 0 && process.send) {
      process.send('BUILD_COMPLETE');
    }
    // watch
    if (watch) {
      log.pending('start watch', srcDir);
      const watcher = chokidar.watch(join(cwd, srcDir), {
        ignoreInitial: true,
      });
      watcher.on('all', (event, fullPath) => {
        const relPath = fullPath.replace(join(cwd, srcDir), '');
        log.watch(`[${event}] ${join(srcDir, relPath)}`);
        if (!existsSync(fullPath)) return;
        if (statSync(fullPath).isFile()) {
          createStream(fullPath);
        }
      });
    }
  });
}

function isLerna(cwd) {
  return existsSync(join(cwd, 'lerna.json'));
}

// Init
const args = yParser(process.argv.slice(3));
const watch = args.w || args.watch;
if (isLerna(cwd)) {
  const dirs = readdirSync(join(cwd, 'packages'))
    .filter(dir => dir.charAt(0) !== '.');
  pkgCount = dirs.length;
  dirs.forEach(pkg => {
    build(`./packages/${pkg}`, {
      cwd,
      // watch,
    });
  });
} else {
  pkgCount = 1;
  build('./', {
    cwd,
    watch,
  });
}

