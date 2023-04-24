export const throttle = (func, delay) => {
  let timeoutId;
  return function () {
    if (!timeoutId) {
      timeoutId = setTimeout(() => {
        // eslint-disable-next-line prefer-rest-params
        func.apply(this, arguments);
        timeoutId = null;
      }, delay);
    }
  };
};
