#!/usr/bin/env node

const program = require('commander');

program
  .version('0.0.1')
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .parse(process.argv);

if (!program.args.length !== 2) program.help();
