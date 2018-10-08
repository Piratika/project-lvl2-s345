#!/usr/bin/env node

import program from 'commander';
import fs from 'fs';
import genDiff from '../genDiff';
import { version } from '../../package.json';

program
  .version(version)
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .action((file1, file2) => fs.writeFileSync(`result.${program.format}`, genDiff(file1, file2)))
  .parse(process.argv);

if (program.args.length === 0) program.help();
