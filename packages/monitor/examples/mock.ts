import { rest } from 'msw';

const reports: any[] = [];
const screens = new Map();

export const handlers = [
  // Handles a POST /login request
  rest.get('/screens/:id', async (req, res, ctx) => {
    return await res(ctx.status(200), ctx.json(screens.get(req.params.id)));
  }),
  rest.get('/reports', async (req, res, ctx) => {
    return await res(ctx.status(200), ctx.json(reports));
  }),
  rest.get('/rdce', async (req, res, ctx) => {
    return await res(
      ctx.status(200),
      ctx.json({
        code: 0,
        message: '错误',
      }),
    );
  }),
  rest.post('/reports', async (req, res, ctx) => {
    const json = await req.json();
    if (json.type === 'screen') {
      screens.set(json.info.id, json);
    } else {
      reports.push(json);
    }
    return await res(ctx.status(200), ctx.json({ ok: true }));
  }),
];
