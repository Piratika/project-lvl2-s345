import stringifyPretty from './renderPretty';
import stringifyPlain from './renderPlain';

const renderType = {
  pretty: stringifyPretty,
  plain: stringifyPlain,
  json: JSON.stringify,
};

const buildResult = (result, format) => renderType[format](result);

export default buildResult;
