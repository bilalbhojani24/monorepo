import { TEXT_LOG_HUMANIZE } from './constants';

const FORMAT_KEYWORDS_MAP = {
  session: ':sessionId',
  key: ':key',
  window: ':windowHandle',
  cookie: ':name',
  attribute: ':name',
  equals: ':other',
  css: ':propertyName',
  property: ':name'
};
const FORMAT_KEYWORDS = Object.keys(FORMAT_KEYWORDS_MAP);
const FORMAT_EXCLUDE_KEYWORDS = [
  'handles',
  'rect',
  'maximize',
  'minimize',
  'fullscreen'
];

export const formatPath = (method, path) => {
  if (!path) {
    return '';
  }

  let formattedPath = path;

  if (!/\/$/.test(path)) {
    formattedPath += '/';
  }

  for (let i = 0; i < FORMAT_KEYWORDS.length; i += 1) {
    const keyword = FORMAT_KEYWORDS[i];
    const keywordMatcher = new RegExp(`${keyword}/([^/]*)/`, 'g');
    const keywordMatch = keywordMatcher.exec(formattedPath);

    if (keywordMatch) {
      const keywordData = keywordMatch[1];

      if (FORMAT_EXCLUDE_KEYWORDS.indexOf(keywordData) === -1) {
        formattedPath = formattedPath.replace(
          keywordMatcher,
          `${keyword}/${FORMAT_KEYWORDS_MAP[keyword]}/`
        );
      }
    }
  }

  if (!/active/g.test(formattedPath)) {
    formattedPath = formattedPath.replace(/element\/[^/]*\//g, 'element/:id/');
  }
  return `${method} ${formattedPath.slice(0, -1)}`;
};

export const getParsedJSON = (data) => {
  try {
    return JSON.parse(data);
  } catch (error) {
    return null;
  }
};

export const getHumanizedText = (method, path) => {
  const formattedPath = formatPath(method, path);

  let readableText = '';
  if (TEXT_LOG_HUMANIZE[formattedPath]) {
    readableText = TEXT_LOG_HUMANIZE[formattedPath];
  } else {
    readableText = formattedPath;
  }
  return readableText;
};

export const formatLog = (log) => {
  const parsedLog = getParsedJSON(log);
  if (!parsedLog) {
    return {};
  }
  const requestArray = parsedLog.request.split(/ /);
  let method = '';
  let path = '';
  let args = '';
  if (requestArray.length === 2) {
    method = requestArray.shift();
    path = requestArray.shift();
  } else if (requestArray.length >= 3) {
    method = requestArray.shift();
    path = requestArray.shift();
    args = requestArray.join(' ').trim();
  }

  const data = {};
  data.readableText = getHumanizedText(method, path);
  data.args = getParsedJSON(args) || args;

  if (parsedLog.response) {
    data.response = getParsedJSON(parsedLog.response) || {};
  } else {
    data.response = {};
  }
  if (data.response?.value) {
    const responseValue =
      getParsedJSON(data.response.value) || data.response.value;
    let text = '';
    let isSnapShot = false;
    if (responseValue?.status === undefined) {
      if (responseValue?.error) {
        text = responseValue.message;
      } else {
        text = responseValue;
      }
    } else if (responseValue.status !== 0) {
      text = responseValue?.message || null;
    } else {
      text = responseValue;
    }

    const isObject = typeof text === 'object';
    if (!isObject) {
      text = text.toString();
      if (
        text.indexOf('https://s3.amazonaws.com') === 0 ||
        (text.includes('https://www.browserstack.com') &&
          text.includes('.png')) ||
        text.includes('.jpeg')
      ) {
        isSnapShot = true;
      }
    }
    data.response.value = {
      text,
      isSnapShot,
      isObject,
      stringifiedText: isObject ? JSON.stringify(text) : ''
    };
  }

  return data;
};
