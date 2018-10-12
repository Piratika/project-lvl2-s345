/*
import _ from 'lodash';

const typeChange = {
  removed: a => (key = a.key) => ({ [key]: 'removed' }),
  added: a => (key = a.key, value = a.value) => ({ [key]: { hasbeen: 'added', value } }),
  nochange: () => {},
  change: a => (key = a.key, valueNew = a.valueNew, valueOld = a.valueOld) => {
  ({ [key]: { hasbeen: 'change', valueOld, valueNew } })},
  haschildren: (a, f) => (key = a.key, children = a.children) => ({ [key]: f(children) }),
};

const stringifyJSON = (obj) => {
  const result = {};
  obj.forEach(a => result[a.key] = typeChange[a.type](a, stringifyJSON));
  return `${JSON.stringify(result)}`;
};

export default stringifyJSON;
*/
