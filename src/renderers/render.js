import stringifyPretty from './renderPretty';
import stringifyPlain from './renderPlain';
import stringifyJSON from './renderJSON';

const renderType = {
  pretty: result => `${stringifyPretty(result, 0)}\n`,
  plain: result => `${stringifyPlain(result, '')}\n`,
  json: result => `${JSON.stringify(stringifyJSON(result))}\n`,
};

const buildResult = (result, format) => renderType[format](result);

export default buildResult;
