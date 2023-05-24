import React from 'react';
import { MdOutlineDoDisturbAlt } from '@browserstack/bifrost';
import ImportImage from 'assets/svg/QuickImport.svg';
import {
  TMButton,
  TMModal,
  TMModalBody,
  TMModalFooter,
  TMModalHeader,
  TMProgressBar
} from 'common/bifrostProxy';
import PropTypes from 'prop-types';

import TitleDescriptionNode from './titleDescriptionNode';
import useImportDetailsModal from './useImportDetailsModal';

const ImportDetailsModal = ({ show, headerText }) => {
  const { closeDetailsModal, importDetails, cancelClickHandler } =
    useImportDetailsModal();

  const getCurrentlyImportingTitle = () => {
    if (importDetails?.percent === 100) return 'Currently Importing:';
    return `Currently Importing (${importDetails?.currentProjectNumber}/${importDetails?.totalProjects}):`;
  };

  return (
    <TMModal show={show} size="3xl" onOverlayClick={closeDetailsModal}>
      <TMModalHeader
        heading={headerText}
        handleDismissClick={closeDetailsModal}
      />
      <TMModalBody>
        <div className="border-base-300 rounded-md border">
          <div className="my-10 flex flex-col items-center">
            <img src={ImportImage} alt="" className="h-10 w-40" />
            <div className="text-lg">
              {importDetails?.percent === 100
                ? 'Quick Import is completed'
                : 'Quick Import is in progress...'}
            </div>
            <div className="text-xs leading-5 text-base-500">
              {importDetails?.percent === 100
                ? 'You can go to All Projects to view the import progress'
                : `We’ll notify you once the overall import is completed`}
            </div>
          </div>
          <div className="border-base-200 bg-base-50 border p-6">
            <div>
              <TitleDescriptionNode
                title={`Current Progress: ${importDetails?.percent}%`}
                titleClassName="text-base-900"
              />
              <TMProgressBar
                title={null}
                percentage={importDetails?.percent}
                wrapperClassName="mt-3"
              />
            </div>
            <div className="mt-6 flex">
              <TitleDescriptionNode
                title={getCurrentlyImportingTitle()}
                description={
                  importDetails?.percent === 100
                    ? '--'
                    : importDetails?.currentProjectName
                }
                wrapperClassName="basis-2/5"
              />
              <div className="flex basis-3/5 justify-between">
                <TitleDescriptionNode
                  title="Successfully Imported:"
                  description={`${importDetails?.successfullyImportedProjects}/${importDetails?.totalProjects}`}
                />
                <TitleDescriptionNode
                  title="Failed to Import:"
                  description={`${importDetails?.failedProjects}/${importDetails?.totalProjects}`}
                />
              </div>
            </div>
          </div>
          {importDetails?.percent === 100 ? null : (
            <div className="text-base-800 my-2 flex items-center justify-center text-xs font-medium">
              <MdOutlineDoDisturbAlt className="h-4 w-4" />
              <span className="ml-1">
                Do not wish to continue?{' '}
                <button type="button" onClick={cancelClickHandler}>
                  Cancel
                </button>{' '}
                this import.
              </span>
            </div>
          )}
        </div>
      </TMModalBody>
      <TMModalFooter position="right">
        <TMButton colors="white" onClick={closeDetailsModal}>
          Close
        </TMButton>
      </TMModalFooter>
    </TMModal>
  );
};

ImportDetailsModal.propTypes = {
  show: PropTypes.bool,
  headerText: PropTypes.string
};

ImportDetailsModal.defaultProps = {
  show: false,
  headerText: ''
};

export default ImportDetailsModal;
