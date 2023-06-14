import { getDateInFormat } from 'utils/dateTime';

export function getCustomDateRangeSubTitles(lowerBound, upperBound) {
  const startDate = getDateInFormat(lowerBound);
  const endDate = getDateInFormat(upperBound);
  return `${startDate} - ${endDate}`;
}
