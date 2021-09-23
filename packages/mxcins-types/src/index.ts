export * from 'type-fest';

export const tuple = <T extends string[]>(...args: T): T => args;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyRecord = Record<string, any>;
