/* eslint-disable @typescript-eslint/ban-ts-comment */
import { describe, expect, it, vi } from 'vitest';
import type { EventHandler } from '../src/types';
import Monitor from '../src/monitor';

const make = (): Monitor => new Monitor({ reportURL: '123', recordScreen: false });

const handler: EventHandler<'b'> = {
  name: 'b',
  handle: () => ({ report: false, info: { src: '' } }),
};
describe('monitor class', () => {
  it('handlers', () => {
    const monitor = make();
    // @ts-expect-error
    const prevsize = monitor.handlers.size;
    monitor.use(handler);
    // @ts-expect-error
    expect(monitor.handlers.size - prevsize).toBe(1);
    // @ts-expect-error
    expect(monitor.handlers.get('b')).toBe(handler);

    console.warn = vi.fn();

    monitor.use(handler);
    expect(console.warn).toBeCalledWith(
      'a handler named b already exists and will be overwritten!',
    );
  });
  it('stack:click', () => {
    const monitor = make();
    const btn = document.createElement('button');
    document.body.appendChild(btn);
    btn.focus(); // for jsdom trigger focus
    btn.click();
    // @ts-expect-error
    const stack = monitor.stack;
    expect(stack.length).toBe(1);
    expect(stack[0].type).toBe('click');
  });
});
