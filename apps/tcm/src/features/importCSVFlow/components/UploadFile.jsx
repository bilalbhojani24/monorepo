import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { MdFolder } from '@browserstack/bifrost';
import { ExpandLessOutlinedIcon, ExpandMoreOutlinedIcon } from 'assets/icons';
import {
  TMAlerts,
  TMAttachments,
  TMButton,
  TMFileUpload,
  TMSectionHeadings
} from 'common/bifrostProxy';

import { downloadSampleCSV } from '../../../api/importCSV.api';
import { FolderExplorerModal } from '../../../common/FolderExplorer';
import { setCSVUploadError } from '../slices/importCSVSlice';

import CSVForm from './CSVForm';
import FolderInputWButton from './folderInputWButtons';
import useImportCSV from './useImportCSV';

const UploadFile = () => {
  const {
    csvUploadError,
    fileConfig,
    projectId,
    folderId,
    showMoreFields,
    showChangeFolderModal,
    selectedFolderLocation,
    uploadFileProceedLoading,
    allFoldersForCSV,
    fetchFolders,
    handleFileUpload,
    handleFileRemove,
    handleProceedClick,
    handleShowMoreFields,
    handleChangeFolderClick,
    handleUploadToRootClick,
    hideFolderExplorerModal
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

  useEffect(() => {
    fetchFolders(projectId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  return (
    <div className="w-4/5 max-w-7xl">
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
      <div className="border-base-200 rounded-md border-2 border-solid bg-white p-6">
        <TMSectionHeadings
          title="Upload CSV file"
          variant="buttons"
          trailingHeadNode={
            <>
              <TMButton
                variant="primary"
                onClick={handleProceedClick}
                isIconOnlyButton={uploadFileProceedLoading}
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
            heading=""
            subHeading="CSV format allowed"
            accept=".csv"
            onChange={handleFileUpload}
          />
        )}
        {fileConfig?.fileName && (
          <TMAttachments
            attachments={[{ name: fileConfig?.fileName }]}
            onActionClick={handleFileRemove}
          />
        )}
        <div className="text-base-600 mt-4 text-sm">
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
        <FolderInputWButton
          label="Folder Location"
          text={folderId ? selectedFolderLocation : '/'}
          secondBtnDisabled={!folderId}
          firstCta="Change Folder"
          secondCta="Upload to Root Location"
          firstCtaClick={() => {
            handleChangeFolderClick();
          }}
          secondCtaClick={() => {
            handleUploadToRootClick();
          }}
          icon={<MdFolder className="text-brand-400 h-5 w-5" />}
        />
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
      <FolderExplorerModal
        heading="Folder Location"
        subHeading="Chose your desired folder location where you want to move your test cases"
        isRootAvailable
        radioGroupTitle="Upload to:"
        projectId={projectId}
        selectedFolderId={folderId}
        allFolders={allFoldersForCSV}
        show={showChangeFolderModal}
        trailingButton
        showEmptyModal={projectId === 'new'}
        onClose={hideFolderExplorerModal}
        confirmButtonText="Update Location"
        folderExplorerHeader="Folders"
        rootFolderText="Test Cases will be created at root location. New folders will be created if they are defined in the uploaded CSV."
      />
    </div>
  );
};

export default UploadFile;
