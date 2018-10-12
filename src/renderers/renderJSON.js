// import _ from 'lodash';

const typeChange = {
  removed: () => 'removed',
  added: a => ({ hasbeen: 'added', value: a.value }),
  nochange: () => {},
  change: a => ({ hasbeen: 'changed', valueOld: a.valueOld, valueNew: a.valueNew }),
  haschildren: (a, f) => f(a.children),
};

const stringifyJSON = obj => obj.reduce((acc, a) => {
  const value = typeChange[a.type](a, stringifyJSON);
  acc[a.key] = value;
  return acc;
}, {});

export default stringifyJSON;
