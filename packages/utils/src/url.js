import getBaseURL from './getBaseURL';

export default function isValidURL(url) {
  return url.match(
    /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?\/?(.*)?$/
  );
}

export const questionUrl = (questionId) => {
  return `${getBaseURL()}/question/${questionId}`;
};

export const getUrlParam = (param) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
};
