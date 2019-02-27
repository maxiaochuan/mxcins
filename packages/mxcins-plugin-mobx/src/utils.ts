import { existsSync } from 'fs';
import { join } from 'path';

const EXTNAMES = ['.js', '.jsx', '.ts', '.tsx'];

export function findJS(baseDir: string, fileNameWithoutExtname: string): string | null {
  // EXTNAMES
  for (const extname of EXTNAMES) {
    const fileName = `${fileNameWithoutExtname}${extname}`;
    const absFilePath = join(baseDir, fileName);
    if (existsSync(absFilePath)) {
      return absFilePath;
    }
  }
  return null;
}

function stripFirstSlash(path: string) {
  if (path.charAt(0) === '/') {
    return path.slice(1);
  } else {
    return path;
  }
}

export function chunkName(cwd: string, path: string, winPath: any) {
  return stripFirstSlash(winPath(path).replace(winPath(cwd), ''))
    .replace(/\//g, '__')
    .replace(/^src__/, '')
    .replace(/^pages__/, 'p__')
    .replace(/^page__/, 'p__');
}
