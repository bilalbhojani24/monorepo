export const checkProgress = () => {
  let count = 0;

  return () =>
    new Promise((res) => {
      setTimeout(() => {
        if (count === 5) {
          res({
            message: 'Reverse trial activated successfully',
            success: true
          });
        }
        count += 1;
        res({ message: 'Reverse trial in progress', success: false });
      }, 1000);
    });
};

export const activateFreeTrial = () =>
  new Promise((res) => {
    setTimeout(() => res({ message: 'success' }), 1000);
  });
