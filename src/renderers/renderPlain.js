import _ from 'lodash';

const stringifyValuePlain = (key, value) => {
  //  if (_.isArray(value)) return f(value, `${deep}.${key}`);
  if (_.isObject(value)) return '[complex value]';
  return `'${value}'`;
};

const pathKeyForPlain = (path, key) => (path ? `${path}.${key}` : `${key}`);

const typeChangePlain = {
  removed: (path, a) => `Property '${pathKeyForPlain(path, a.key)}' was removed`,
  added: (path, a) => `Property '${pathKeyForPlain(path, a.key)}' was added with value: ${stringifyValuePlain(a.key, a.value)}`,
  nochange: () => '',
  change: (path, a) => `Property '${pathKeyForPlain(path, a.key)}' was updated. From ${stringifyValuePlain(a.key, a.valueOld)} to ${stringifyValuePlain(a.key, a.valueNew)}`,
  haschildren: (path, a, f) => f(a.children, `${pathKeyForPlain(path, a.key)}`),
};

const stringifyPlain = (obj, path) => {
  const result = obj.map(a => typeChangePlain[a.type](path, a, stringifyPlain));
  return `${result.filter(a => a).join('\n')}`;
};

export default stringifyPlain;
