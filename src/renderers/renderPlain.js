import _ from 'lodash';

const stringifyValuePlain = value => (_.isObject(value) ? '[complex value]' : `'${value}'`);
const pathGatherNode = (path, key) => (path ? `${path}.${key}` : `${key}`);

export default (ast) => {
  const typeChangePlain = {
    removed: (path, a) => `Property '${pathGatherNode(path, a.key)}' was removed`,
    added: (path, a) => `Property '${pathGatherNode(path, a.key)}' was added with value: ${stringifyValuePlain(a.value)}`,
    unchanged: () => '',
    changed: (path, a) => `Property '${pathGatherNode(path, a.key)}' was updated. From ${stringifyValuePlain(a.valueOld)} to ${stringifyValuePlain(a.valueNew)}`,
    haschildren: (path, a, f) => f(a.children, `${pathGatherNode(path, a.key)}`),
  };

  const stringifyPlain = (obj, path) => {
    const result = obj.map(a => typeChangePlain[a.type](path, a, stringifyPlain));
    return `${result.filter(a => a).join('\n')}`;
  };

  return `${stringifyPlain(ast, '')}\n`;
};
