import _ from 'lodash';

const getFormateValue = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return value;
};

const plain = (tree) => {
  const iter = (data, path) => {
    const lines = data
      .filter((node) => node.type !== 'unchanged')
      .map((node) => {
        const property = _.trim(`${path}.${node.key}`, '.');
        switch (node.type) {
          case 'changed':
            return `Property '${property}' was updated. From ${getFormateValue(node.value1)} to ${getFormateValue(node.value2)}`;
          case 'added':
            return `Property '${property}' was added with value: ${getFormateValue(node.value2)}`;
          case 'removed':
            return `Property '${property}' was removed`;
          case 'children':
            return iter(node.children, property);
          default:
            return `Unknow type '${node.type}'!`;
        }
      });
    return lines.join('\n');
  };
  return iter(tree, '');
};

export default plain;
