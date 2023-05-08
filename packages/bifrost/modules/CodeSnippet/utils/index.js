export const convertRangeToArray = (range) => {
  const [start, end] = range.split('-').map(Number);

  if (start <= end) {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }
  return [];
};

export const isNumber = (str) => !isNaN(str);

export const copyToClipboard = (text) => {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'absolute';
  textarea.style.left = '-9999px';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
};
