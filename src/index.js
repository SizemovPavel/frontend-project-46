import parse from './parsers.js';
import buildAst from './buildAst.js';
import getDiff from './formatters/index.js';

const genDiff = (filePath1, filepath2, format = 'stylish') => {
  const object1 = parse(filePath1);
  const object2 = parse(filepath2);
  if (!object1 || !object2) {
    return undefined;
  }
  return getDiff(buildAst(object1, object2), format);
};

export default genDiff;
