/* eslint-disable @typescript-eslint/no-explicit-any */
type Middleware = (...args: any[]) => Promise<void> | void;

export default class Onion {
  public middlewares: any[] = [];

  public defaultMiddlewaresLen = 0;

  constructor(defaultMiddlewares: Middleware[] = []) {
    if (!Array.isArray(defaultMiddlewares)) {
      throw new TypeError('Default Middlewares must be an array!');
    }

    this.middlewares = [...defaultMiddlewares];
    this.defaultMiddlewaresLen = this.middlewares.length;
  }

  public use(middleware: Middleware): void {
    if (typeof middleware !== 'function') {
      throw new TypeError('Middleware must be function!');
    }
    this.middlewares.splice(this.middlewares.length - this.defaultMiddlewaresLen, 0, middleware);
  }

  public excute(ctx: undefined | any): Promise<any> {
    const fn = this.compose();
    return fn(ctx);
  }

  private compose() {
    const { middlewares } = this;
    return function wrapper(ctx: any) {
      let index = -1;
      const dispatch = (i: number) => {
        if (i <= index) {
          return Promise.reject(
            new Error('next() should not be called multiple times in one middleware'),
          );
        }

        index = i;
        const fn = middlewares[i];
        if (!fn) {
          return Promise.resolve();
        }

        try {
          return Promise.resolve(fn(ctx, () => dispatch(i + 1)));
        } catch (error) {
          return Promise.reject(error);
        }
      };

      return dispatch(0);
    };
  }
}
