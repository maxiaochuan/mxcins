#!/usr/bin/env node

const signale = require('signale');
const args = require('yargs-parser')(process.argv.slice(2));

if (args.v || args.version) {
  signale.log(require('../package').version);
  process.exit(0);
}

switch (args._[0]) {
  case 'build':
    // case 'test':
    // case 'rollup':
    require(`../src/${args._}`);
    break;
  default:
    signale.error(`Unknown command ${args._}`);
    break;
}
