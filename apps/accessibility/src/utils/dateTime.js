import { format } from 'date-fns';

import { extractTimezoneAbbr } from './extractTimezoneAbbr';

export function getCustomTimeStamp({
  dateString,
  withoutTZ = false,
  withoutTime,
  dateFormat
}) {
  const dateObject = new Date(dateString);
  const timeZone = extractTimezoneAbbr(dateObject);
  if (dateFormat) {
    const formattedDate = format(dateObject, dateFormat);
    const returnDate = timeZone
      ? `${formattedDate} (${timeZone})`
      : formattedDate;
    return withoutTZ ? formattedDate : returnDate;
  }
  if (withoutTime) {
    const formattedDate = format(dateObject, 'MMM dd, yyyy');
    const returnDate = timeZone
      ? `${formattedDate} (${timeZone})`
      : formattedDate;
    return withoutTZ ? formattedDate : returnDate;
  }
  const formattedDate = format(dateObject, 'MMM dd, yyyy | h:mm:ss a');
  const returnDate = timeZone
    ? `${formattedDate} (${timeZone})`
    : formattedDate;
  return withoutTZ ? formattedDate : returnDate;
}
