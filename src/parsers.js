import yaml from 'js-yaml';
import ini from 'ini';

const parseFunctions = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};

export default a => parseFunctions[a.ext](a.content);
