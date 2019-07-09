#!/usr/bin/env node
/* eslint-disable no-console */
const { spawn } = require('child_process');
const yargs = require('yargs');

const availableDemos = {
  hello: {
    desc: 'Run Simple Hello World Example - Part 1',
    command: ['npx', ['http-server', './01-simple-hello-world']],
  },
  hello2: {
    desc: 'Run Simple Hello World Example - Part 2',
    command: ['npx', ['http-server', './02-simple-hello-world-2']],
  },
  'vanilla-state': {
    desc: 'Run Vanilla State Management',
    command: [
      'npx',
      ['webpack-dev-server', '--config', './04-vanilla-state-management/webpack.config.js'],
    ],
  },
};

// eslint-disable-next-line no-unused-expressions
yargs
  .command('*', 'default command', () => yargs.showHelp())
  .command(
    'demo <demo>',
    'run demos',
    () => {},
    ({ demo }) => {
      yargs.positional('demo', {
        describe: 'Demo to run',
        type: 'string',
      });

      let childProcess;

      if (availableDemos[demo] && availableDemos[demo].command) {
        childProcess = spawn(...availableDemos[demo].command, { stdio: 'inherit' });
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
    }
  )
  .command('ls', 'list all available demos', () => {}, () => console.log('demo command is ran'))
  .demandCommand().argv;
