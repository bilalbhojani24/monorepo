/*
 * This function return the relative value of the time passed in
 * @params absoluteTime - absolute value of the time
 */
const calculateRelativeTime = (absoluteTime) => {
  const oldTimestamp = new Date(absoluteTime).getTime();
  const oldSeconds = Math.floor(oldTimestamp / 1000);

  const date = new Date();
  const timestamp = date.getTime();
  const seconds = Math.floor(timestamp / 1000);

  const difference = seconds - oldSeconds;

  let relativeTime = ``;

  if (difference < 60) {
    // Less than a minute has passed:
    relativeTime = `${difference} seconds ago`;
  } else if (difference < 3600) {
    // Less than an hour has passed:
    relativeTime = `${Math.floor(difference / 60)} minutes ago`;
  } else if (difference < 86400) {
    // Less than a day has passed:
    relativeTime = `${Math.floor(difference / 3600)} hours ago`;
  } else if (difference < 2620800) {
    // Less than a month has passed:
    relativeTime = `${Math.floor(difference / 86400)} days ago`;
  } else if (difference < 31449600) {
    // Less than a year has passed:
    relativeTime = `${Math.floor(difference / 2620800)} months ago`;
  } else {
    // More than a year has passed:
    relativeTime = `${Math.floor(difference / 31449600)} years ago`;
  }

  return relativeTime;
};

export { calculateRelativeTime };
