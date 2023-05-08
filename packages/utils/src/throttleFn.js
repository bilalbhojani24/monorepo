const throttleFn = (func, delay) => {
  let lastCall = 0;
  return function (...args) {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    func(...args);
  };
};

export default throttleFn;
