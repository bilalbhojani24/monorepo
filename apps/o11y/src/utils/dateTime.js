import {
  endOfDay,
  format,
  getUnixTime,
  intervalToDuration,
  startOfDay,
  sub
} from 'date-fns';

import { extractTimezoneAbbr } from './extractTimezoneAbbr';

export const getUnixStartOfDay = (value) => getUnixTime(startOfDay(value));
export const getUnixEndOfDay = (value) => getUnixTime(endOfDay(value));

// Refer this(https://date-fns.org/v2.29.3/docs/format) for date-fns format options
export const getDateInFormat = (dateString, dateFormat = 'MMM dd, yyyy') =>
  format(dateString, dateFormat);

/**
 *
 * @param {number} value
 * @param {string} type possible options = ["years","months","weeks","days","hours","minutes","seconds"]
 * @returns {number} unix number
 */
export const getSubtractedUnixTime = (value, type = 'days') =>
  getUnixStartOfDay(sub(new Date(), { [type]: value }));

export function getCustomTimeStampFns({
  dateString,
  withoutTZ = false,
  withoutTime
}) {
  const timeZone = extractTimezoneAbbr(new Date(dateString));
  if (withoutTime) {
    const formattedDate = format(dateString, 'MMM dd, yyyy');
    const returnDate = timeZone
      ? `${formattedDate} ( ${timeZone} )`
      : formattedDate;
    return withoutTZ ? formattedDate : returnDate;
  }
  const formattedDate = format(dateString, 'MMM dd, yyyy | h:mm:ss a');
  const returnDate = timeZone
    ? `${formattedDate} ( ${timeZone} )`
    : formattedDate;
  return withoutTZ ? formattedDate : returnDate;
}
export function getTimeStamp(dateString) {
  return format(dateString, 'h:mm:ss a');
}
export function milliSecondsToTime(ms, html) {
  const timeUnit = html ? '<span class="text-base-500">' : '';
  const timeUnitCloseTag = html ? '</span>' : '';

  if (!ms) {
    return html ? `0${timeUnit}ms${timeUnitCloseTag}` : '0ms';
  }

  const tDuration = intervalToDuration({
    start: 0,
    end: ms
  });

  const hrs = tDuration.hours;
  const mins = tDuration.minutes;
  const secs = tDuration.seconds;

  switch (true) {
    case hrs > 0:
      return html
        ? `${hrs}${timeUnit}h${timeUnitCloseTag} ${mins}${timeUnit}m${timeUnitCloseTag} ${secs}${timeUnit}s${timeUnitCloseTag}`
        : `${hrs}h ${mins}m ${secs}s`;
    case mins > 0:
      return html
        ? `${mins}${timeUnit}m${timeUnitCloseTag} ${secs}${timeUnit}s${timeUnitCloseTag}`
        : `${mins}m ${secs}s`;
    case secs > 0:
      return html
        ? `${(ms / 1000).toFixed(2)}${timeUnit}s${timeUnitCloseTag}`
        : `${(ms / 1000).toFixed(2)}s`;
    default:
      return html
        ? `${ms.toFixed(2)}${timeUnit}ms${timeUnitCloseTag}`
        : `${ms.toFixed(2)}ms`;
  }
}

export function millisToMinutesAndSeconds(ms) {
  let millis = ms;
  if (!millis) {
    return '00:00';
  }
  let returnText = '';
  if (millis < 0) {
    millis = Math.abs(millis);
    returnText = '-';
  }
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  if (seconds === 60) {
    return `${returnText}0${minutes + 1} + ':00'`;
  }
  const minStr = minutes < 10 ? `0${minutes}` : minutes;
  const secStr = seconds < 10 ? `0${seconds}` : seconds;
  return `${returnText}${minStr}:${secStr}`;
}
