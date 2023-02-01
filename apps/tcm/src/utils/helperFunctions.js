import moment from 'moment';

export const routeFormatter = (link, replaceConf) => {
  let tempLink = link;
  if (replaceConf)
    Object.keys(replaceConf).forEach((keyValue) => {
      tempLink = tempLink.replace(`:${keyValue}`, replaceConf[keyValue]);
    });

  tempLink = tempLink.split(':')[0].replace(/[?]/g, '');
  return tempLink.slice(-1) === '/' ? tempLink.slice(0, -1) : tempLink;
};

export const formatTime = (date, to) => {
  if (!moment(date).isValid) return 'N/A';

  switch (to) {
    case 'ago':
      return moment(date).fromNow();
    case 'date':
      return moment(date).format('DD/MM/YYYY');
    case 'time':
      return moment(date).format('DD/MM/YYYY | h:mm A');
    default:
      return moment(date).format('DD/MM/YYYY');
  }
};

export const onSubmitKeyHandler = (e) => (doAfter) => {
  if (e?.key === 'Enter') doAfter();
};

export const selectMenuValueMapper = (data) =>
  data.map((item) => ({
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
