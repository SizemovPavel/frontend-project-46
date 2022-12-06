import _ from 'lodash';

const space = 4;
const getIndent = (count) => ' '.repeat(count * space);

const getValue = (node, depth) => {
  if (!_.isObject(node)) {
    return node;
  }
  const indentForEndBracket = getIndent(depth - 1);
  const lines = Object.entries(node).map(([key, value]) => `${getIndent(depth)}${key}: ${getValue(value, depth + 1)}`);
  return [
    '{',
    ...lines,
    `${indentForEndBracket}}`,
  ].join('\n');
};

const stylish = (data, depth = 1) => {
  const indent = getIndent(depth).slice(0, getIndent(depth) - 2);
  const indentForEndBracket = getIndent(depth - 1);

  const lines = data.flatMap((node) => {
    switch (node.type) {
      case 'children':
        return `${indent}  ${node.key}: ${stylish(node.children, depth + 1)}`;
      case 'added':
        return `${indent}+ ${node.key}: ${getValue(node.value2, depth + 1)}`;
      case 'removed':
        return `${indent}- ${node.key}: ${getValue(node.value1, depth + 1)}`;
      case 'changed':
        return [`${indent}- ${node.key}: ${getValue(node.value1, depth + 1)}`, `${indent}+ ${node.key}: ${getValue(node.value2, depth + 1)}`];
      case 'unchanged':
        return `${indent}  ${node.key}: ${getValue(node.value1, depth + 1)}`;
      default:
        return `Unknown type: '${node.type}'!`;
    }
  });
  return [
    '{',
    ...lines,
    `${indentForEndBracket}}`,
  ].join('\n');
};

export default stylish;
