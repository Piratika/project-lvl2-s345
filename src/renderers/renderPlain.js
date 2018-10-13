import _ from 'lodash';

export default (ast) => {
  const stringifyValuePlain = (key, value) => {
    if (_.isObject(value)) return '[complex value]';
    return `'${value}'`;
  };

  const pathGatherNode = (path, key) => (path ? `${path}.${key}` : `${key}`);

  const typeChangePlain = {
    removed: (path, a) => `Property '${pathGatherNode(path, a.key)}' was removed`,
    added: (path, a) => `Property '${pathGatherNode(path, a.key)}' was added with value: ${stringifyValuePlain(a.key, a.value)}`,
    nochange: () => '',
    change: (path, a) => `Property '${pathGatherNode(path, a.key)}' was updated. From ${stringifyValuePlain(a.key, a.valueOld)} to ${stringifyValuePlain(a.key, a.valueNew)}`,
    haschildren: (path, a, f) => f(a.children, `${pathGatherNode(path, a.key)}`),
  };

  const stringifyPlain = (obj, path) => {
    const result = obj.map(a => typeChangePlain[a.type](path, a, stringifyPlain));
    return `${result.filter(a => a).join('\n')}`;
  };

  return `${stringifyPlain(ast, '')}\n`;
};
