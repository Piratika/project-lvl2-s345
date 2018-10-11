import _ from 'lodash';

const stringifyValue = (key, value, deep, f) => {
  if (_.isArray(value)) return `${key}: ${f(value, deep + 1)}`;
  if (_.isObject(value)) return `${key}: `;
  return `${key}: ${value}`;
};

const deepStr = d => '    '.repeat(d);

const typeChange = {
  removed: (deep, a, f) => `${deepStr(deep)}  - ${stringifyValue(a.key, a.value, deep, f)}`,
  added: (deep, a, f) => `${deepStr(deep)}  + ${stringifyValue(a.key, a.value, deep, f)}`,
  nochange: (deep, a, f) => `${deepStr(deep)}    ${stringifyValue(a.key, a.value, deep, f)}`,
  change: (deep, a, f) => `${deepStr(deep)}  - ${stringifyValue(a.key, a.valueOld, deep, f)}\n${deepStr(deep)}  + ${stringifyValue(a.key, a.valueNew, deep, f)}`,
  haschildren: (deep, a, f) => `${deepStr(deep)}    ${stringifyValue(a.key, a.children, deep, f)}`,
};

const stringify = (obj, deep) => {
  const result = obj.map(a => typeChange[a.type](deep, a, stringify));
  return `{\n${result.join('\n')}\n${deepStr(deep)}}`;
};

const buildResult = (result, format) => (format === 'pretty' ? `${stringify(result, 0)}\n` : 'ещё какие-то варианты видимо');

export default buildResult;
