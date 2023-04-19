const convertSecondsToTimeFormat = (seconds) => {
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
  if (hours === 0) {
    hours = '';
  } else if (hours < 10) {
    hours = `0${hours}:`;
  } else {
    hours = `${hours}:`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (remainingSeconds < 10) {
    remainingSeconds = `0${remainingSeconds}`;
  }

  return `${hours}${minutes}:${remainingSeconds}`;
};

export default convertSecondsToTimeFormat;
