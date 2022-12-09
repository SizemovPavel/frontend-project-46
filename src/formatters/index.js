import stylish from './toStylish.js';
import plain from './toPlain.js';
import toJson from './toJson.js';

export default (data, format) => {
  switch (format) {
    case 'stylish':
      return stylish(data);
    case 'plain':
      return plain(data);
    case 'json':
      return toJson(data);
    default:
      return `Unknown type: '${format}'!`;
  }
};
