import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parse from './parsers';

const readFile = (pathFile) => {
  const pathRel = path.relative('', pathFile);
  return { content: fs.readFileSync(pathRel, 'utf-8'), ext: path.extname(pathRel) };
};

const f = [
  {
    condition: (obj1, obj2, key) => (_.has(obj1, key) && !_.has(obj2, key)),
    diff: (obj1, obj2, key) => ({ type: 'removed', key, value: obj1[key] }),
  },
  {
    condition: (obj1, obj2, key) => (!_.has(obj1, key) && _.has(obj2, key)),
    diff: (obj1, obj2, key) => ({ type: 'added', key, value: obj2[key] }),
  },
  {
    condition: (obj1, obj2, key) => obj1[key] === obj2[key],
    diff: (obj1, obj2, key) => ({ type: 'nochange', key, value: obj2[key] }),
  },
  {
    condition: (obj1, obj2, key) => obj1[key] !== obj2[key],
    diff: (obj1, obj2, key) => ({
      type: 'change', key, valueOld: obj1[key], valueNew: obj2[key],
    }),
  },

];

const buildResult = (arr, format) => {
  const result = arr.map((a) => {
    switch (a.type) {
      case 'removed':
        return `  - ${a.key}: ${a.value}`;
      case 'added':
        return `  + ${a.key}: ${a.value}`;
      case 'nochange':
        return `    ${a.key}: ${a.value}`;
      case 'change':
        return `  - ${a.key}: ${a.valueOld}\n  + ${a.key}: ${a.valueNew}`;
      default: console.error('not change, not added, not removed. what is it');
    }
    return a;
  });
  return format === 'pretty' ? `{\n${result.join('\n')}\n}` : 'ещё какие-то варианты видимо';
};

export default (first, second, format) => {
  const obj1 = parse(readFile(first).content, readFile(first).ext);
  const obj2 = parse(readFile(second).content, readFile(second).ext);
  const keys = _.union(Object.keys(obj1), Object.keys(obj2));
  const result = keys.map((key) => {
    const { diff } = f.find(({ condition }) => condition(obj1, obj2, key));
    return diff(obj1, obj2, key);
  });
  return buildResult(result, format);
};
