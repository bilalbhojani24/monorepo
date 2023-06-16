import Highcharts from 'highcharts/highstock';

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
