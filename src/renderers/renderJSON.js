export default (result) => {
  const typeChange = {
    removed: () => 'removed',
    added: a => ({ hasbeen: 'added', value: a.value }),
    unchanged: () => {},
    changed: a => ({ hasbeen: 'changed', valueOld: a.valueOld, valueNew: a.valueNew }),
    haschildren: (a, f) => f(a.children),
  };

  const stringifyJSON = obj => obj.reduce((acc, a) => {
    const value = typeChange[a.type](a, stringifyJSON);
    acc[a.key] = value;
    return acc;
  }, {});

  return `${JSON.stringify(stringifyJSON(result), null, ' ')}\n`;
};
