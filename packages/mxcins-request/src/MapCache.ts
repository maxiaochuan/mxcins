import type { IRequestOptions, IResponse } from './interface';

export default class MapCache {
  private cache: Map<string, IResponse>;

  private timer: { [x: string]: number };

  private maxSize: number;

  constructor(options: IRequestOptions) {
    this.cache = new Map();
    this.timer = {};
    this.maxSize = options.cacheSize || 20;
  }

  public get(k: Record<string, unknown>): IResponse | undefined {
    return this.cache.get(JSON.stringify(k));
  }

  public set(k: Record<string, unknown>, v: IResponse, ttl = 60000): void {
    if (this.maxSize > 0 && this.cache.size >= this.maxSize) {
      const dKey = [...this.cache.keys()][0];
      this.cache.delete(dKey);
      if (this.timer[dKey]) {
        window.clearTimeout(this.timer[dKey]);
      }
    }
    const cacheKey = JSON.stringify(k);
    this.cache.set(cacheKey, v);
    if (ttl > 0) {
      this.timer[cacheKey] = window.setTimeout(() => {
        this.cache.delete(cacheKey);
        delete this.timer[cacheKey];
      }, ttl);
    }
  }

  public delete(k: Record<string, unknown>): boolean {
    const cacheKey = JSON.stringify(k);
    delete this.timer[cacheKey];
    return this.cache.delete(cacheKey);
  }

  public clear(): void {
    this.timer = {};
    return this.cache.clear();
  }
}
