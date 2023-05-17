import React, { useState } from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.vite';
import PropTypes from 'prop-types';

const PdfViewer = ({ file, renderPageNumber, wrapperClassName }) => {
  const [numPages, setNumPages] = useState(null);
  // implement complete pdf viewer if requirement exists
  // const [pageNumber, setPageNumber] = useState(1);
  const [pageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages: pages }) {
    setNumPages(pages);
  }

  return (
    <div className={wrapperClassName}>
      <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      {renderPageNumber && (
        <p>
          Page {pageNumber} of {numPages}
        </p>
      )}
    </div>
  );
};

PdfViewer.propTypes = {
  file: PropTypes.string.isRequired,
  renderPageNumber: PropTypes.bool,
  wrapperClassName: PropTypes.string
};
PdfViewer.defaultProps = {
  renderPageNumber: false,
  wrapperClassName: ''
};

export default PdfViewer;
