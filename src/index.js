import { readFileSync } from 'node:fs';
import path from 'node:path';
import _ from 'lodash';

const getParseObject = (filePath) => {
    const absolutPath = path.resolve(filePath);
    const readFile = readFileSync(absolutPath);
    return JSON.parse(readFile);
};

const genDiff = (filePath1, filepath2) => {
    const object1 = getParseObject(filePath1);
    const object2 = getParseObject(filepath2);
    const keysOfObject1 = Object.keys(object1);
    const keysOfObject2 = Object.keys(object2);
    const uniqueKeys = _.union(keysOfObject1, keysOfObject2);
    const sortKeys = uniqueKeys.sort();
    
    const result = {};
    for (const key of sortKeys) {
        if (!Object.hasOwn(object1, key)) {
            result[`+ ${key}`] = object2[key];
        } else if (!Object.hasOwn(object2, key)) {
            result[`- ${key}`] = object1[key];
        } else if (object1[key] !== object2[key]) {
            result[`- ${key}`] = object1[key];
            result[`+ ${key}`] = object2[key];
        } else {
            result[`  ${key}`] = object1[key];
        }
    };

    const entriesObject = Object.entries(result);
    const strElements = entriesObject.map((element) => element.join(': '));
    const str = strElements.join('\n  ');
    return `{\n  ${str}\n}`;
};

export default genDiff;
