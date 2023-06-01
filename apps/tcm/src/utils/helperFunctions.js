import moment from 'moment-timezone';

import { BDD } from '../features/Repository/const/addTestCaseConst';

export const routeFormatter = (
  link,
  replaceConf,
  maintainSearchParams = false
) => {
  let tempLink = link;
  if (replaceConf)
    Object.keys(replaceConf).forEach((keyValue) => {
      tempLink = tempLink.replace(`:${keyValue}`, replaceConf[keyValue]);
    });

  tempLink = tempLink.split(':')[0].replace(/[?]/g, '');
  tempLink = tempLink.slice(-1) === '/' ? tempLink.slice(0, -1) : tempLink;
  return maintainSearchParams ? tempLink + window.location.search : tempLink;
};

export const formatTime = (date, to) => {
  if (!moment(date).isValid) return 'N/A';
  const timeZoneString = Intl.DateTimeFormat().resolvedOptions().timeZone;

  switch (to) {
    case 'ago':
      return moment(date).fromNow();
    case 'date':
      return moment(date).format('DD/MM/YYYY');
    case 'time':
      return moment(date).format('DD/MM/YYYY | h:mm A');
    case 'timeG':
      return moment(date)
        .tz(timeZoneString)
        .format('MMM DD, YYYY | h:mm:ss A (zz)');
    default:
      return moment(date).format('DD/MM/YYYY');
  }
};

export const onSubmitKeyHandler = (e, doAfter, confirmNotEmpty) => {
  if (e?.key === 'Enter') {
    if (confirmNotEmpty) {
      if (e.currentTarget.value !== '') doAfter();
    } else doAfter();
  }
};

export const selectMenuValueMapper = (data) =>
  data?.map((item) => ({
    label: item,
    value: item
  }));

export const splitStringToArray = (string, splitKey) => [
  ...new Set(
    string
      .split(splitKey)
      .map((item) => item.trim())
      .filter((item) => item !== '')
  )
];

export const capitalizeString = (phrase) =>
  phrase
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

export const getMappedValue = (mapArray, value) => {
  if (value === BDD) return 'Text';

  const match = mapArray.find((item) => item.value === value);
  return match?.label ? match.label : '--';
};

export const getSystemOrCustomValue = (
  systemValue,
  customValue,
  mapArray = []
) => {
  if (systemValue) {
    return mapArray.length
      ? getMappedValue(mapArray, systemValue)
      : systemValue;
  }
  if (customValue) return customValue;
  return '--';
};

export const redirectToPrevPage = (searchParams, setSearchParams) => {
  if (searchParams.get('p') - 1 === 1) {
    searchParams.delete('p');
    setSearchParams(searchParams);
  } else {
    searchParams.set('p', `${searchParams.get('p') - 1}`);
    setSearchParams(searchParams.toString());
  }
};

export const updateQueryParamWOEvent = (paramsObject) => {
  if (!window?.history?.pushState) return;

  const params = new URLSearchParams(paramsObject).toString();
  const newurl = `${window.location.protocol}//${window.location.host}${
    window.location.pathname
  }${params ? '?' : ''}${params || ''}`;
  window.history.pushState({ path: newurl }, '', newurl);
};
