import dayjs from 'dayjs';

export const secondsToMinutes = (numberOfSeconds) => {
  const minutes = Math.floor(numberOfSeconds / 60)
    .toFixed(0)
    .padStart(2, '0');
  const leftOverSeconds = (numberOfSeconds % 60).toFixed(0).padStart(2, '0');

  return `${minutes}:${leftOverSeconds}`;
};

export const formatReportTime = (timestamp) => {
  // return an empty string if time provided is not a valid date
  if (!timestamp || !dayjs(timestamp).isValid()) {
    return '';
  }

  return dayjs(timestamp).format('DD MMM, YYYY • HH:mm:ssa');
};
