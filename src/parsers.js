import { readFileSync } from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import process from 'node:process';

const getFile = (filePath) => {
  const currentDirectory = process.cwd();
  const absolutPath = path.resolve(currentDirectory, '__fixtures__', filePath);
  return readFileSync(absolutPath, 'utf-8');
};

const getExtName = (filePath) => path.extname(filePath);

const getParsedFile = (filePath) => {
  const ext = getExtName(filePath);
  switch (ext) {
    case '.json':
      return JSON.parse(getFile(filePath));
    case '.yaml':
    case '.yml':
      return yaml.load(getFile(filePath));
    default:
      return `Unknow extname: '${ext}'!`;
  }
};

export default getParsedFile;
