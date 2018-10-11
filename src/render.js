import _ from 'lodash';

const stringifyValuePretty = (key, value, deep, f) => {
  if (_.isArray(value)) return `${key}: ${f(value, deep + 1)}`;
  if (_.isObject(value)) return `${key}: `;
  return `${key}: ${value}`;
};

const stringifyValuePlain = (key, value) => {
//  if (_.isArray(value)) return f(value, `${deep}.${key}`);
  if (_.isObject(value)) return '[complex value]';
  return `'${value}'`;
};

const deepStr = d => '    '.repeat(d);
const pathKeyForPlain = (path, key) => (path ? `${path}.${key}` : `${key}`);

const typeChangePretty = {
  removed: (deep, a, f) => `${deepStr(deep)}  - ${stringifyValuePretty(a.key, a.value, deep, f)}`,
  added: (deep, a, f) => `${deepStr(deep)}  + ${stringifyValuePretty(a.key, a.value, deep, f)}`,
  nochange: (deep, a, f) => `${deepStr(deep)}    ${stringifyValuePretty(a.key, a.value, deep, f)}`,
  change: (deep, a, f) => `${deepStr(deep)}  - ${stringifyValuePretty(a.key, a.valueOld, deep, f)}\n${deepStr(deep)}  + ${stringifyValuePretty(a.key, a.valueNew, deep, f)}`,
  haschildren: (deep, a, f) => `${deepStr(deep)}    ${stringifyValuePretty(a.key, a.children, deep, f)}`,
};

const typeChangePlain = {
  removed: (path, a) => `Property '${pathKeyForPlain(path, a.key)}' was removed`,
  added: (path, a) => `Property '${pathKeyForPlain(path, a.key)}' was added with value: ${stringifyValuePlain(a.key, a.value)}`,
  nochange: () => '',
  change: (path, a) => `Property '${pathKeyForPlain(path, a.key)}' was updated. From ${stringifyValuePlain(a.key, a.valueOld)} to ${stringifyValuePlain(a.key, a.valueNew)}`,
  haschildren: (path, a, f) => f(a.children, `${pathKeyForPlain(path, a.key)}`),
};

const stringifyPretty = (obj, deep) => {
  const result = obj.map(a => typeChangePretty[a.type](deep, a, stringifyPretty));
  return `{\n${result.join('\n')}\n${deepStr(deep)}}`;
};

const stringifyPlain = (obj, path) => {
  const result = obj.map(a => typeChangePlain[a.type](path, a, stringifyPlain));
  return `${result.filter(a => a).join('\n')}`;
};

const buildResult = (result, format) => (format === 'pretty' ? `${stringifyPretty(result, 0)}\n` : `${stringifyPlain(result, '')}\n`);

export default buildResult;
