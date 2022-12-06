import stylish from './stylish.js';

export default (data, format) => {
  switch (format) {
    case 'stylish':
      return stylish(data);
    default:
      return `Unknown type: '${format}'!`;
  }
};
