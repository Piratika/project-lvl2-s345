import stringifyPretty from './renderPretty';
import stringifyPlain from './renderPlain';
// import stringifyJSON from './renderJSON';

const renderType = {
  pretty: result => `${stringifyPretty(result, 0)}\n`,
  plain: result => `${stringifyPlain(result, '')}\n`,
  json: result => `${JSON.stringify(result)}\n`,
};

const buildResult = (result, format) => renderType[format](result);

export default buildResult;
