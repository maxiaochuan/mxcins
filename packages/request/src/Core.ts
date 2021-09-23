import { RequestContext, RequestMiddleware, RequestOptions } from './interface';
import Onion from './Onion';
import MapCache, { MapCacheOptions } from './MapCache';

export default class Core {
  public onion: Onion;

  public cache: MapCache;

  constructor(options: MapCacheOptions, defaultMiddlewares: RequestMiddleware[] = []) {
    this.onion = new Onion(defaultMiddlewares);
    this.cache = new MapCache(options);
  }

  public use(middleware: RequestMiddleware): this {
    this.onion.use(middleware);
    return this;
  }

  public async request(uri: string, options: RequestOptions = {}): Promise<RequestContext['res']> {
    const ctx: RequestContext = {
      req: { uri, options },
      res: undefined,
      cache: this.cache,
    };

    return new Promise((resolve, reject) =>
      this.onion
        .excute(ctx)
        .then(() => resolve(ctx.res))
        .catch(error => {
          const { options: opts = {} } = ctx.req;
          const { onError } = opts;
          if (onError) {
            try {
              const d = onError(error);
              resolve(d);
            } catch (error_) {
              reject(error_);
            }
          } else {
            reject(error);
          }
        }),
    );
  }
}
