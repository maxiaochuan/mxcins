type Middleware = (...args: any[]) => Promise<void> | void;

export default class Onion {
  public middlewares: any[] = [];
  public defaultMiddlewaresLen: number = 0;
  constructor(defaultMiddlewares: Middleware[] = []) {
    if (!Array.isArray(defaultMiddlewares)) {
      throw new TypeError('Default Middlewares must be an array!');
    }

    this.middlewares = [...defaultMiddlewares];
    this.defaultMiddlewaresLen = this.middlewares.length;
  }

  public use(middleware: Middleware) {
    if (typeof middleware !== 'function') {
      throw new TypeError('Middleware must be function!');
    }
    this.middlewares.splice(this.middlewares.length - this.defaultMiddlewaresLen, 0, middleware);
  }

  public excute(params: any = null) {
    const fn = this.compose();
    return fn(params);
  }

  private compose() {
    const middlewares = this.middlewares;
    return function wrapper(params: any) {
      let index = -1;
      const dispatch = (i: any) => {
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
          return Promise.resolve(fn(params, () => dispatch(i + 1)));
        } catch (err) {
          return Promise.reject(err);
        }
      };

      return dispatch(0);
    };
  }
}
