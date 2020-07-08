import { join } from 'path';
import { EventEmitter } from 'events';
import { loadDotEnv } from './utils';

export interface IServiceOpts {
  cwd: string;
  env?: string;
}

export default class Service extends EventEmitter {
  public paths: {
    cwd: string;
    absNodeModulesPath?: string;
    absSrcPath?: string;
    absPagesPath?: string;
    absOutputPath?: string;
    absTmpPath?: string;
  };

  public env?: string;

  constructor(opts: IServiceOpts) {
    super();
    const { cwd, env } = opts;
    this.paths = { cwd: cwd || process.cwd() };
    this.env = env || process.env.NODE_ENV;

    // dotenv
    const envPath = join(this.paths.cwd, '.env');
    loadDotEnv(envPath);
  }
}
