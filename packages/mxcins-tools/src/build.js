const { join } = require('path');
const through = require('through2');
const rimraf = require('rimraf');
const vfs = require('vinyl-fs');

const cwd = process.cwd();

function build(dir, opts = {}) {
  const libDir = join(dir, 'lib');
  const srcDir = join(dir, 'src');

  // delete lib
  rimraf.sync(libDir);

  function createStream(src) {
    return vfs.src([
      src,
    ]).pipe(vfs.dest(libDir));
  }

  const stream = createStream(join(srcDir, '**/*'));
}

build('./');