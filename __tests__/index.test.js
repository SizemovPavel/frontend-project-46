import { test, expect, describe } from '@jest/globals';
import path, { dirname } from 'path';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');
const resultStylish = readFile('resultForStylish.txt', 'utf-8');
const resultForPlain = readFile('resultForPlain.txt', 'utf-8');

describe('Tests for stylish', () => {
  test('*.json', () => {
    expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'stylish')).toEqual(resultStylish);
  });
  test('*.yml', () => {
    expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'stylish')).toEqual(resultStylish);
  });
});

describe('Tests for plain', () => {
  test('*.json', () => {
    expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain')).toEqual(resultForPlain);
  });
  test('*.yml', () => {
    expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'plain')).toEqual(resultForPlain);
  });
});
