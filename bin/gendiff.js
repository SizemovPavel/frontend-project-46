#!/usr/bin/env node

import { Command } from 'commander';
import path from 'node:path';
import { readlinkSync } from 'node:fs';
import gendiff from '../src/utils';

const program = new Command();

program
  .name('gendiff')
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format (default: "stylish")')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2) => {
    const file1 = readlinkSync(path.resolve(filepath1));
    const file2 = readlinkSync(path.resolve(filepath2));
    console.log(gendiff(file1, file2));
  });

program.parse();
