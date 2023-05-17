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
            <div className="text-lg">Quick Import is in progress...</div>
            <div>We’ll notify you once the overall import is completed</div>
          </div>
          <div className="border-base-200 bg-base-50 border p-6">
            <div>
              <TitleDescriptionNode
                title={`Current Progress: ${importDetails?.overallProgress}%`}
                titleClassName="text-base-900"
              />
              <TMProgressBar
                title={null}
                percentage={importDetails?.overallProgress}
              />
            </div>
            <div className="mt-6 flex">
              <TitleDescriptionNode
                title="Currently Importing:"
                description="Project May Updates 2023"
                wrapperClassName="basis-2/5"
              />
              <div className="flex basis-3/5 justify-between">
                <TitleDescriptionNode
                  title="Successfully Imported:"
                  description="1/12"
                />
                <TitleDescriptionNode
                  title="Failed to Import:"
                  description="11/12"
                />
              </div>
            </div>
          </div>
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
