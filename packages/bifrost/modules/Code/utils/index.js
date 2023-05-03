export const convertRangeToArray = (range) => {
  const [start, end] = range.split('-').map(Number);

  if (start <= end) {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }
  return [];
};

export const isNumber = (str) => !isNaN(str);
