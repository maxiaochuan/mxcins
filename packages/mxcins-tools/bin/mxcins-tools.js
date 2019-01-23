#!/usr/bin/env node

const signale = require('signale');
const argv = require('yargs-parser')(process.argv.slice(2));

if (argv.v || argv.version) {
  signale.log(require('../package').version);
  process.exit(0);
}

switch (argv._[0]) {
  case 'build':
  case 'test':
  case 'rollup':
    // require(`./src/${args._}`);
    break;
  default:
    signale.error(`Unknown command ${argv._}`);
    break;
}
