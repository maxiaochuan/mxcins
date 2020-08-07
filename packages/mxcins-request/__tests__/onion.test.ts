import Onion from '../src/Onion';

type ANY = any;

const fn = () => Promise.resolve();

describe('Onion', () => {
  it('constructor', () => {
    expect(new Onion().middlewares.length).toBe(0);

    expect(() => new Onion({} as ANY)).toThrow(/Default Middlewares/);

    expect(new Onion([() => Promise.resolve()]).middlewares.length).toBe(1);
  });

  it('use', () => {
    const o = new Onion();
    o.use(fn);
    expect(o.middlewares.length).toBe(1);
    expect(o.middlewares[0]).toBe(fn);
  });

  it('excute', async () => {
    const o = new Onion();
    o.use(async (ctx: ANY, next: ANY) => {
      ctx.a = 'a';
      await next();
    });

    o.use(async (_: ANY, next: ANY) => {
      await next();
    });

    const obj: ANY = { req: '1' };
    const run = () => o.excute(obj);
    await run();
    expect(obj.a).toBe('a');
  });
});
