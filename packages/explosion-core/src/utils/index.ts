import { existsSync, readFileSync } from 'fs';
import { parse } from 'dotenv';

// eslint-disable-next-line import/prefer-default-export
export const loadDotEnv = (envPath: string) => {
  if (existsSync(envPath)) {
    const parsed = parse(readFileSync(envPath));

    Object.keys(parsed).forEach(name => {
      if (!Object.prototype.hasOwnProperty.call(process.env, name)) {
        process.env[name] = parsed[name];
      }
    });
  }
};
