import _ from 'lodash';

const deepStr = d => '    '.repeat(d);

export default (ast) => {
  const stringifyValuePretty = (key, value, deep, f) => {
    if (_.isArray(value)) return `${key}: ${f(value, deep + 1)}`;
    if (_.isObject(value)) {
      const valueToString = Object.keys(value).map(a => stringifyValuePretty(a, value[a], deep + 1)).join('\n');
      return `${key}: {\n${deepStr(deep + 2)}${valueToString}\n${deepStr(deep + 1)}}`;
    }
    return `${key}: ${value}`;
  };

  const typeChangePretty = {
    removed: (deep, a, f) => `${deepStr(deep)}  - ${stringifyValuePretty(a.key, a.value, deep, f)}`,
    added: (deep, a, f) => `${deepStr(deep)}  + ${stringifyValuePretty(a.key, a.value, deep, f)}`,
    unchanged: (deep, a, f) => `${deepStr(deep)}    ${stringifyValuePretty(a.key, a.value, deep, f)}`,
    changed: (deep, a, f) => [`${deepStr(deep)}  - ${stringifyValuePretty(a.key, a.valueOld, deep, f)}`, `${deepStr(deep)}  + ${stringifyValuePretty(a.key, a.valueNew, deep, f)}`],
    haschildren: (deep, a, f) => `${deepStr(deep)}    ${stringifyValuePretty(a.key, a.children, deep, f)}`,
  };

  const stringifyPretty = (obj, deep) => {
    const result = obj.map(a => typeChangePretty[a.type](deep, a, stringifyPretty));
    return `{\n${_.flatten(result).join('\n')}\n${deepStr(deep)}}`;
  };

  return `${stringifyPretty(ast, 0)}\n`;
};
