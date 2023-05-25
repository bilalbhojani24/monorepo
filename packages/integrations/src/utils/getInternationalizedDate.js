import { parseDate } from '@internationalized/date';

// wrapper function to counter parse date breaking
// when it fails to parse the date
export const getInternationalizedDate = (dateString) => {
  let parsedDate = null;
  try {
    parsedDate = parseDate(dateString);
  } catch (_) {
    // do nothing
  }
  return parsedDate;
};
