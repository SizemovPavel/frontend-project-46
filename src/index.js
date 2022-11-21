import { readFileSync } from 'node:fs';
import path from 'node:path';
import _ from 'lodash';

const getParseObject = (filePath) => {
  const absolutPath = path.resolve(filePath);
  const readFile = readFileSync(absolutPath, 'utf-8');
  return JSON.parse(readFile);
};

const genDiff = (filePath1, filepath2) => {
  const object1 = getParseObject(filePath1);
  const object2 = getParseObject(filepath2);
  const keysOfObject1 = Object.keys(object1);
  const keysOfObject2 = Object.keys(object2);
  const uniqueKeys = _.union(keysOfObject1, keysOfObject2);
  const sortKeys = uniqueKeys.sort();

  const lines = sortKeys.map((key) => {
    switch (true) {
      case !Object.hasOwn(object1, key):
        return `+ ${key}: ${object2[key]}`;
      case !Object.hasOwn(object2, key):
        return `- ${key}: ${object1[key]}`;
      case object1[key] !== object2[key]:
        return `- ${key}: ${object1[key]}\n  + ${key}: ${object2[key]}`;
      default:
        return `  ${key}: ${object1[key]}`;
    }
  }).join('\n  ');
  return `{\n  ${lines}\n}`;
};

export default genDiff;
