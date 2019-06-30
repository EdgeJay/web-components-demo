#!/usr/bin/env node
/* eslint-disable no-console */
const { spawn } = require('child_process');
const yargs = require('yargs');

const availableDemos = {
  hello: {
    desc: 'Run Simple Hello World Example',
    command: ['npx', ['http-server', './simple-hello-world']],
  },
};

const { argv } = yargs
  .usage('Usage: npm start -- -d [demo]')
  .describe('d', 'Load a demo')
  .demandOption(['d'])
  .describe('l', 'List available demos');

let childProcess;

if (availableDemos[argv.d] && availableDemos[argv.d].command) {
  childProcess = spawn(...availableDemos[argv.d].command, { stdio: 'inherit' });
}

if (childProcess) {
  if (childProcess.stdout) {
    childProcess.stdout.on('data', data => {
      console.log(data.toString());
    });
  }

  if (childProcess.stderr) {
    childProcess.stderr.on('data', data => {
      console.log(`${data}`);
    });
  }

  childProcess.on('close', code => {
    console.log(`child process exited with code ${code}`);
  });
}
