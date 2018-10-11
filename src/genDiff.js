import _ from 'lodash';

const ifValueObject = a => (_.isObject(a) ? (Object.keys(a).map(key => ({ type: 'nochange', key, value: a[key] }))) : a);

const f = [
  {
    condition: (obj1, obj2, key) => (_.has(obj1, key) && !_.has(obj2, key)),
    diff: (obj1, obj2, key) => ({ type: 'removed', key, value: ifValueObject(obj1[key]) }),
  },
  {
    condition: (obj1, obj2, key) => (!_.has(obj1, key) && _.has(obj2, key)),
    diff: (obj1, obj2, key) => ({ type: 'added', key, value: ifValueObject(obj2[key]) }),
  },
  {
    condition: (obj1, obj2, key) => _.isObject(obj1[key]) && _.isObject(obj2[key]),
    diff: (obj1, obj2, key, gendiff) => ({
      type: 'haschildren', key, children: gendiff(obj1[key], obj2[key]),
    }),
  },
  {
    condition: (obj1, obj2, key) => obj1[key] === obj2[key],
    diff: (obj1, obj2, key) => ({ type: 'nochange', key, value: ifValueObject(obj2[key]) }),
  },
  {
    condition: (obj1, obj2, key) => obj1[key] !== obj2[key],
    diff: (obj1, obj2, key) => ({
      type: 'change', key, valueOld: ifValueObject(obj1[key]), valueNew: ifValueObject(obj2[key]),
    }),
  },
];

const gendiff = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2));
  return keys.map((key) => {
    const { diff } = f.find(({ condition }) => condition(obj1, obj2, key));
    return diff(obj1, obj2, key, gendiff);
  });
};

export default gendiff;
