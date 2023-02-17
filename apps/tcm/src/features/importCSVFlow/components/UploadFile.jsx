import React from 'react';
import { useDispatch } from 'react-redux';
import { ExpandLessOutlinedIcon, ExpandMoreOutlinedIcon } from 'assets/icons';
import {
  TMAlerts,
  TMAttachments,
  TMButton,
  TMFileUpload,
  TMSectionHeadings
} from 'common/bifrostProxy';

import { downloadSampleCSV } from '../../../api/importCSV.api';
import { setCSVUploadError } from '../slices/importCSVSlice';

import CSVForm from './CSVForm';
import useImportCSV from './useImportCSV';

const UploadFile = () => {
  const {
    csvUploadError,
    fileConfig,
    showMoreFields,
    uploadFileProceedLoading,
    handleFileUpload,
    handleFileRemove,
    handleProceedClick,
    handleShowMoreFields
  } = useImportCSV();

  const dispatch = useDispatch();
  const handleDownloadSampleCSV = () => {
    downloadSampleCSV().then((blob) => {
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `sample.csv`);

      // Append to html link element page
      document.body.appendChild(link);

      // Start download
      link.click();
    });
  };

  return (
    <div className="border-base-200 m-4 w-4/5 rounded-md border-2 border-solid bg-white p-6">
      {csvUploadError && (
        <div className="mb-3">
          <TMAlerts
            accentBorder={false}
            show={!!csvUploadError}
            dismissButton
            modifier="error"
            title={csvUploadError}
            linkText={null}
            dismissButtonFn={() => dispatch(setCSVUploadError(''))}
          />
        </div>
      )}
      <TMSectionHeadings
        title="Upload CSV/XLS"
        variant="buttons"
        trailingHeadNode={
          <>
            <TMButton
              variant="primary"
              onClick={handleProceedClick}
              loading={uploadFileProceedLoading}
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
      <div className="before:border-base-300 relative mb-6 mt-4 flex w-full justify-center before:absolute before:top-1/2 before:z-0 before:w-full before:border-b ">
        <TMButton
          onClick={handleShowMoreFields}
          colors="white"
          variant="rounded"
          wrapperClassName="w-44 relative pr-2 z-[1] bg-white"
          iconPlacement="end"
          icon={
            showMoreFields ? (
              <ExpandLessOutlinedIcon className="!h-4 !w-4" />
            ) : (
              <ExpandMoreOutlinedIcon className="!h-4 !w-4" />
            )
          }
        >
          Show {showMoreFields ? 'Less' : 'More'} Fields
        </TMButton>
      </div>
      {showMoreFields && <CSVForm />}
    </div>
  );
};

export default UploadFile;
