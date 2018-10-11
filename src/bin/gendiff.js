#!/usr/bin/env node

import program from 'commander';
import genDiff from '..';
import { version } from '../../package.json';

program
  .version(version)
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'pretty')
  .action((file1, file2) => console.log(genDiff(file1, file2, program.format)))
  .parse(process.argv);

if (program.args.length === 0) program.help();
