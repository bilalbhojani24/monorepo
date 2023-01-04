/*
  This file contains all string manipulation related utilities.
*/

export const capitalize = (word, upCaseTwo = false) => {
  if (word) {
    word = word.toLowerCase();
    if (upCaseTwo && word.length === 2) {
      word = word.toUpperCase();
    } else {
      word = word.charAt(0).toUpperCase() + word.slice(1);
    }
  }
  return word;
};

export const pluralize = (value, word, plural) => {
  if (value === 1) {
    return `${value} ${word}`;
  }
  if (plural) {
    return `${value} ${plural}`;
  }
  return `${value} ${word}s`;
};

export const titleize = (input) => (input ? input.toLowerCase().replace(/(?:^|\s|-)\S/g, (x) => x.toUpperCase()) : '');

export const snakeCaseToHyphenated = (data) => {
  data = Array.isArray(data) ? data.join('') : data;
  return data?.replace(/[A-Z]/g, (m) => `-${m?.toLowerCase()}`);
};

export const snakeCase = (string) => {
  if (string) {
    return string
      .replace(/\W+/g, ' ')
      .split(/ |\B(?=[A-Z])/)
      .map((word) => word.toLowerCase())
      .join('_');
  }
  return string;
};
