import _ from 'lodash';

const buildAst = (object1, object2) => {
  const sortKeys = _.sortBy(_.union(Object.keys(object1), Object.keys(object2)));

  const getDiff = sortKeys.map((key) => {
    const firstValueObject = object1[key];
    const secondValueObject = object2[key];

    if (_.isObject(firstValueObject) && _.isObject(secondValueObject)) {
      return { key, type: 'children', children: buildAst(firstValueObject, secondValueObject) };
    }
    if (!Object.hasOwn(object1, key)) {
      return { key, type: 'added', value2: secondValueObject };
    }
    if (!Object.hasOwn(object2, key)) {
      return { key, type: 'removed', value1: firstValueObject };
    }
    if (firstValueObject !== secondValueObject) {
      return {
        key, type: 'changed', value1: firstValueObject, value2: secondValueObject,
      };
    }
    return { key, value1: firstValueObject, type: 'unchanged' };
  });
  return getDiff;
};

export default buildAst;
