import { existsSync, readFileSync } from 'node:fs';
import { parse } from 'dotenv';

// eslint-disable-next-line import/prefer-default-export
export const loadDotEnv = (envPath: string): void => {
  if (existsSync(envPath)) {
    const parsed = parse(readFileSync(envPath));

    for (const name of Object.keys(parsed)) {
      if (!Object.prototype.hasOwnProperty.call(process.env, name)) {
        process.env[name] = parsed[name];
      }
    }
  }
};
