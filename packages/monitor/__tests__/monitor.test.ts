/* eslint-disable @typescript-eslint/ban-ts-comment */
import { describe, expect, it, vi } from 'vitest';
import type { EventHandler } from '../src/types';
import Monitor from '../src/monitor';

const handler: EventHandler<'b'> = {
  name: 'b',
  handle: () => ({ src: '' }),
};
describe('monitor class', () => {
  it('handlers', () => {
    const monitor = new Monitor({
      reportURL: '123',
    });
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
});