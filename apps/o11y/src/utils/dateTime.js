import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

import { extractTimezoneAbbr } from './extractTimezoneAbbr';

dayjs.extend(duration);

export const getUnixStartOfDay = (value) => dayjs(value).startOf('day').unix();
export const getUnixEndOfDay = (value) => dayjs(value).endOf('day').unix();

export const getSubtractedUnixTime = (value, type = 'day') =>
  getUnixStartOfDay(dayjs().subtract(value, type));

export function getCustomTimeStamp({
  dateString,
  withoutTZ = false,
  withoutTime
}) {
  const timeZone = extractTimezoneAbbr(new Date(dateString));
  if (withoutTime) {
    const formattedDate = dayjs(dateString).format('MMM DD, YYYY');
    const returnDate = timeZone
      ? `${formattedDate} ( ${timeZone} )`
      : formattedDate;
    return withoutTZ ? formattedDate : returnDate;
  }
  const formattedDate = dayjs(dateString).format('MMM DD, YYYY | h:mm:ss A');
  const returnDate = timeZone
    ? `${formattedDate} ( ${timeZone} )`
    : formattedDate;
  return withoutTZ ? formattedDate : returnDate;
}
// export function getTimeStamp(dateString) {
//   return dayjs(dateString).format('h:mm:ss A');
// }
// eslint-disable-next-line sonarjs/cognitive-complexity
export function milliSecondsToTime(ms, html) {
  if (!ms) {
    if (html) {
      return '0<span class="timeUnit">ms<span>';
    }
    return '0ms';
  }
  const tDuration = dayjs.duration(ms);
  const hrs = tDuration.hours();
  const mins = tDuration.minutes();
  const secs = tDuration.seconds();
  let formattedDuration = '';
  if (hrs) {
    if (html) {
      formattedDuration += `${hrs}<span class="timeUnit">h</span> ${mins}<span class="timeUnit">m</span> ${secs}<span class="timeUnit">s</span>`;
    } else {
      formattedDuration += `${hrs}h ${mins}m ${secs}s`;
    }
  } else if (mins) {
    if (html) {
      formattedDuration += `${mins}<span class="timeUnit">m</span> ${secs}<span class="timeUnit">s</span>`;
    } else {
      formattedDuration += `${mins}m ${secs}s`;
    }
  } else if (html) {
    formattedDuration += secs
      ? `${tDuration.asSeconds().toFixed(2)}<span class="timeUnit">s<s/pan>`
      : `${ms.toFixed(2)}<span class="timeUnit">ms</span>`;
  } else {
    formattedDuration += secs
      ? `${tDuration.asSeconds().toFixed(2)}s`
      : `${ms.toFixed(2)}ms`;
  }
  return formattedDuration;
}
// export function millisToMinutesAndSeconds(millis) {
//   if (!millis) {
//     return '00:00';
//   }
//   let returnText = '';
//   if (millis < 0) {
//     millis = Math.abs(millis);
//     returnText = '-';
//   }
//   const minutes = Math.floor(millis / 60000);
//   const seconds = ((millis % 60000) / 1000).toFixed(0);
//   return seconds == 60
//     ? `${returnText}0${minutes + 1} + ':00'`
//     : `${returnText}${minutes < 10 ? `0${minutes}` : minutes}:${
//         seconds < 10 ? `0${seconds}` : seconds
//       }`;
// }
