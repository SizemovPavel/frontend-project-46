import _ from 'lodash';

const buildAst = (object1, object2) => {
  const sortKeys = _.sortBy(_.union(Object.keys(object1), Object.keys(object2)));

  const getDiff = sortKeys.map((key) => {
    const firstValueObject = object1[key];
    const secondValueObject = object2[key];

    if (_.isObject(firstValueObject) && _.isObject(secondValueObject)) {
      return { key, children: buildAst(firstValueObject, secondValueObject), type: 'children' };
    }
    if (!Object.hasOwn(object1, key)) {
      return { key, value2: secondValueObject, type: 'added' };
    }
    if (!Object.hasOwn(object2, key)) {
      return { key, value1: firstValueObject, type: 'removed' };
    }
    if (firstValueObject !== secondValueObject) {
      return {
        key, value1: firstValueObject, value2: secondValueObject, type: 'changed',
      };
    }
    return { key, value1: firstValueObject, type: 'unchanged' };
  });
  return getDiff;
};

export default buildAst;
