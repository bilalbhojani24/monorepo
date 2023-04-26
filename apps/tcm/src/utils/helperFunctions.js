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

export const handleZeroEntryInAPage = ({
  metaPage,
  searchParams,
  setSearchParams
}) => {
  if (metaPage?.prev === null) return;
  if (metaPage?.prev * metaPage?.page_size + 1 === metaPage?.count) {
    searchParams.set('p', `${metaPage.prev}`);
    setSearchParams(searchParams.toString());
  }
};
