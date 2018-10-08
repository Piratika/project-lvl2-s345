#!/usr/bin/env node

import program from 'commander';

program
  .version('version')
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .parse(process.argv);

if (!program.args.length !== 2) program.help();
