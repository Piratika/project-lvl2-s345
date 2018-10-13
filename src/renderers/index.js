import stringifyPretty from './renderPretty';
import stringifyPlain from './renderPlain';
import stringifyJSON from './renderJSON';

const renderType = {
  pretty: stringifyPretty,
  plain: stringifyPlain,
  json: stringifyJSON,
};

const buildResult = (result, format) => renderType[format](result);

export default buildResult;
