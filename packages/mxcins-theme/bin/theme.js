#!/usr/bin/env node
const args = require('yargs-parser')(process.argv.slice(2), {
  alias: {
    version: ['v'],
  },
});

/**
 * version
 */
if (args.version) {
  // eslint-disable-next-line no-console
  console.log(require('../package').version);
  process.exit(0);
}

const cwd = process.cwd();

const [input, output] = args._;

if (!input || !output) {
  console.error(`input: ${input}, output: ${output} is missing.`);
}

const { join } = require('path');
require('../dist/index.cjs').default({ input: join(cwd, input), output: join(cwd, output) });
