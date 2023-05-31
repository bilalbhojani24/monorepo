import { O11Y_DATE_RANGE } from 'constants/common';
import Highcharts from 'highcharts/highstock';
import { getDateInFormat } from 'utils/dateTime';

const suffixes = ['', 'k', 'M', 'B', 'T'];

export function getNumberFormattedYAxisLabel() {
  const { value } = this;
  let absValue = Math.abs(value);
  let i = 0;
  while (absValue >= 1000 && i < suffixes.length - 1) {
    absValue /= 1000;
    i += 1;
  }
  const formattedValue = Highcharts.numberFormat(absValue, 0) + suffixes[i];
  return value >= 0 ? formattedValue : `-${formattedValue}`;
}

export function getDateRangeSubTitles(appliedDateRange) {
  if (!appliedDateRange?.id) return '';
  if (appliedDateRange.id === 'custom') {
    const startDate = getDateInFormat(appliedDateRange.value.lowerBound);
    const endDate = getDateInFormat(appliedDateRange.value.upperBound);
    return `between ${startDate} to ${endDate}`;
  }
  let result = '';
  switch (appliedDateRange.id) {
    case O11Y_DATE_RANGE.days7.key:
      result = `in the last 7 days`;
      break;
    case O11Y_DATE_RANGE.days15.key:
      result = `in the last 15 days`;
      break;
    case O11Y_DATE_RANGE.days30.key:
      result = `in the last 30 days`;
      break;
    case O11Y_DATE_RANGE.months6.key:
      result = `in the last 6 months`;
      break;
    case O11Y_DATE_RANGE.year1.key:
      result = `in the last 1 year`;
      break;
    case O11Y_DATE_RANGE.year2.key:
      result = `in the last 2 years`;
      break;
    default:
      break;
  }
  return result;
}
