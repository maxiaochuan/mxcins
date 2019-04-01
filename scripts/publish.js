#!/usr/bin/env node

const shell = require('shelljs');
const { join } = require('path');
const { fork } = require('child_process');

// 检测npm registry
if (shell.exec('npm config get registry').stdout.indexOf('https://registry.npmjs.org/') === -1) {
  console.error('Failed: set npm registry to https://registry.npmjs.org/ first');
  process.exit(1);
}
// 检测npm user
if (shell.exec('npm whoami').code !== 0) {
  console.error('Failed: npm login first');
  process.exit(1);
}

const ret = shell.exec(`./node_modules/.bin/lerna changed`).stdout;

const changedRepos = ret
  .split('\n')
  .map(line => line.replace('- ', ''))
  .filter(line => line !== '');

console.log('changed repos: ', changedRepos);

if (changedRepos.length === 0) {
  console.log('No package is updated.');
  process.exit(0);
}

const buildCode = shell.exec('npm run build').code;
if (buildCode !== 0) {
  console.error('Failed: npm run build');
  process.exit(1);
}

const cwd = process.cwd();

function publishToNpm() {
  changedRepos.forEach(repo => {
    const name = repo.replace('@', '').replace('/', '-');
    shell.cd(join(cwd, 'packages', name));
    const { version } = require(join(cwd, 'packages', name, 'package.json'));
    if (version.includes('-rc.') || version.includes('-beta.') || version.includes('-alpha.')) {
      console.log(`[${repo}] npm publish --tag next`);
      shell.exec(`npm publish --tag next`);
    } else {
      console.log(`[${repo}] npm publish`);
      shell.exec(`npm publish`);
    }
  });
}

const cp = fork(join(cwd, 'node_modules/.bin/lerna'), ['version'], {
  stdio: 'inherit',
  cwd,
});
cp.on('error', err => {
  console.log(err);
});
cp.on('close', code => {
  console.log('code', code);
  if (code === 1) {
    console.error('Failed: lerna publish');
    process.exit(1);
  }

  publishToNpm();
});
