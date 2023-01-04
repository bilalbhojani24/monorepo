const fileDownload = (data, filename, downloadType = 'text/plain') => {
  const file = new Blob([data], { type: downloadType });
  // IE11 file download fix
  if (navigator.msSaveOrOpenBlob) {
    navigator.msSaveOrOpenBlob(file, filename);
  } else {
    const element = document.createElement('a');
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    element.remove();
  }
};

export default fileDownload;
