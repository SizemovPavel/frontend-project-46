import _ from 'lodash';

const buildAst = (object1, object2) => {
  const sortKeys = _.sortBy(_.union(Object.keys(object1), Object.keys(object2)));

  const getDiff = sortKeys.map((key) => {
    if (_.isObject(object1[key]) && _.isObject(object2[key])) {
      return { key, children: buildAst(object1[key], object2[key]), type: 'children' };
    }
    if (!Object.hasOwn(object1, key)) {
      return { key, value2: object2[key], type: 'added' };
    }
    if (!Object.hasOwn(object2, key)) {
      return { key, value1: object1[key], type: 'removed' };
    }
    if (object1[key] !== object2[key]) {
      return {
        key, value1: object1[key], value2: object2[key], type: 'changed',
      };
    }
    return { key, value1: object1[key], type: 'unchanged' };
  });
  return getDiff;
};

export default buildAst;
