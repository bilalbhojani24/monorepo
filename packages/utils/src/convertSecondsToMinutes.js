// TODO: Probably use some external lib like moment.js for this?
// TODO: Should have to name accordingly (function returning hours also)
const convertSecondsToMinutes = (seconds) => {
  if (!seconds || seconds < 0) {
    return '00:00';
  }
  let hours = Math.floor(seconds / 3600);
  let minutes = Math.floor((seconds - hours * 3600) / 60);

  let remainingSeconds = Math.round(seconds - hours * 3600 - minutes * 60);

  if (remainingSeconds === 60) {
    remainingSeconds = 0;
    minutes += 1;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (remainingSeconds < 10) {
    remainingSeconds = `0${remainingSeconds}`;
  }

  return `${(hours !== '00' ? `${hours}:` : '') + minutes}:${remainingSeconds}`;
};

export default convertSecondsToMinutes;
