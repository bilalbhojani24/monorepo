export const capitalizeFirstLetter = (inputString) => {
  if (inputString.length <= 2) {
    return inputString.toUpperCase();
  }
  return inputString.charAt(0).toUpperCase() + inputString.slice(1);
};
