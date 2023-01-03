const getSelectedText = () => {
  let selectedText = '';
  if (typeof window.getSelection !== 'undefined') {
    selectedText = window.getSelection().toString();
  } else if (typeof document.selection !== 'undefined' && document.selection.type === 'Text') {
    selectedText = document.selection.createRange().text;
  }
  return selectedText;
};

export default getSelectedText;
