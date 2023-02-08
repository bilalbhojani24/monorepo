import React, { useState } from 'react';
import {
  TMAlerts,
  TMAttachments,
  TMButton,
  TMFileUpload,
  TMSectionHeadings
} from 'common/bifrostProxy';

import { downloadSampleCSV } from '../../../api/importCSV.api';

import CSVForm from './CSVForm';
import useImportCSV from './useImportCSV';

const UploadFile = () => {
  const [showMoreFields, setShowMoreFields] = useState(false);
  const {
    csvUploadError,
    fileConfig,
    handleFileUpload,
    handleFileRemove,
    handleProceedClick
  } = useImportCSV();

  const handleShowMoreFields = () => {
    setShowMoreFields(!showMoreFields);
  };

  const handleDownloadSampleCSV = () => {
    downloadSampleCSV()
      // .then((data) => data.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `FileName.pdf`);

        // Append to html link element page
        document.body.appendChild(link);

        // Start download
        link.click();
      });
  };

  return (
    <div className="border-base-200 m-4 flex w-4/5 flex-col self-center rounded-md border-2 border-solid bg-white p-6">
      {csvUploadError && (
        <TMAlerts
          accentBorder={false}
          show={!!csvUploadError}
          dismissButton={false}
        />
      )}
      <TMSectionHeadings
        title="Upload CSV/XLS"
        variant="buttons"
        trailingHeadNode={
          <>
            <TMButton
              variant="primary"
              colors="white"
              onClick={handleProceedClick}
            >
              Proceed
            </TMButton>
          </>
        }
      />
      <div className="mt-5 mb-2">Upload File:</div>
      {!fileConfig?.fileName && (
        <TMFileUpload
          linkText="Upload a file"
          heading="or drag and drop"
          subHeading="CSV & XLS format allowed"
          accept=".csv,.xls"
          onChange={handleFileUpload}
        />
      )}
      {fileConfig?.fileName && (
        <TMAttachments
          attachments={[{ name: fileConfig?.fileName }]}
          onActionClick={handleFileRemove}
        />
      )}
      <div className="text-base-400 mt-4 text-sm">
        You can also download a{' '}
        <span
          tabIndex={0}
          role="button"
          className="cursor-pointer font-semibold text-black"
          onClick={handleDownloadSampleCSV}
          onKeyDown={handleDownloadSampleCSV}
        >
          sample.csv
        </span>{' '}
        with instructions.
      </div>
      <TMButton wrapperClassName="mt-8" onClick={handleShowMoreFields}>
        Show more fields
      </TMButton>
      {showMoreFields && <CSVForm />}
    </div>
  );
};

export default UploadFile;
