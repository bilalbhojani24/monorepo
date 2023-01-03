export const delay = (timeDuration) => {
  return new Promise((resolve) => setTimeout(resolve, timeDuration));
};
