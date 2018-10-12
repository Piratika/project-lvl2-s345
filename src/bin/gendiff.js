#!/usr/bin/env node

import program from 'commander';
import genDiff from '..';
import { version } from '../../package.json';

program
  .version(version)
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', /^(plain|pretty|json)$/i, 'pretty')
  .action((path1, path2) => console.log(genDiff(path1, path2, program.format)))
  .parse(process.argv);

if (program.args.length === 0) program.help();
