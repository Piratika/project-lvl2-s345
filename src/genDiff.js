import _ from 'lodash';
import readFile from './readFile';

export default (first, second) => {
  const obj1 = readFile(first);
  const obj2 = readFile(second);
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  let dif = keys1.reduce((acc, e) => {
    if (!_.has(obj2, e)) {
      return `${acc}\n  - ${e}: ${obj1[e]}`;
    } if (obj1[e] !== obj2[e]) {
      return `${acc}\n  - ${e}: ${obj1[e]}\n  + ${e}: ${obj2[e]}`;
    } return `${acc}\n    ${e}: ${obj2[e]}`;
  }, '');
  dif = keys2.reduce((acc, e) => (!_.has(obj1, e) ? `${acc}\n  + ${e}: ${obj2[e]}` : acc), dif);
  return `{${dif}\n}`;
};
