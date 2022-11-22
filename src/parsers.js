import { readFileSync } from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

const getFile = (filePath) => {
  const absolutPath = path.resolve(filePath);
  return readFileSync(absolutPath, 'utf-8');
};

const getExtName = (filePath) => path.extname(filePath);

const getParsedFile = (filePath) => {
  const ext = getExtName(filePath);
  let parse;
  switch (ext) {
    case '.json':
      parse = JSON.parse;
      break;
    case '.yaml':
    case '.yml':
      parse = yaml.load;
      break;
    default:
      break;
  }
  return parse ? parse(getFile(filePath)) : undefined;
};

export default (filePath) => getParsedFile(filePath);
