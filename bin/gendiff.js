#!/usr/bin/env node

import { program } from 'commander';
import genDiff from '../index.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.0')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .action(genDiff)
  .parse(process.argv);
