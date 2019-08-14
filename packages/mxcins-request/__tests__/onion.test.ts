import Onion from '../src/Onion';

describe('Onion', () => {
  it('constructor', () => {
    expect(new Onion().middlewares.length).toBe(0);

    expect(() => new Onion({} as any)).toThrowError(/Default Middlewares/);

    expect(new Onion([() => Promise.resolve()]).middlewares.length).toBe(1);
  });

  it('use', () => {
    const o = new Onion();
    const fn = () => Promise.resolve();
    o.use(fn);
    expect(o.middlewares.length).toBe(1);
    expect(o.middlewares[0]).toBe(fn);
  });

  it('excute', async () => {
    const o = new Onion();
    o.use(async (ctx: any, next: any) => {
      ctx.a = 'a';
      await next();
    });

    o.use(async (_: any, next: any) => {
      await next();
    });

    const obj: any = { req: '1' };
    const run = () => o.excute(obj);
    await run();
    expect(obj.a).toBe('a');
  });
});
