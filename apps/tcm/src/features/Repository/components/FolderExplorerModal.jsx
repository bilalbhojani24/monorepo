// TODO: after success, rearrange the folder, challenge updatedfolder structure to be fetched in allFolders

import React, { useEffect, useState } from 'react';
import {
  TMAlerts,
  TMButton,
  TMModal,
  TMModalBody,
  TMModalFooter,
  TMModalHeader,
  TMRadioGroup
} from 'common/bifrostProxy';
import FolderExplorer from 'common/FolderExplorer';
import PropTypes from 'prop-types';

import { moveFolderOptions } from '../const/folderConst';

import useFolders from './useFolders';

const FolderExplorerModal = ({
  show,
  heading,
  subHeading,
  alertText,
  isRootAvailable,
  onOK,
  confirmButtonText,
  onClose
}) => {
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [primaryMoveLocation, setPrimaryMoveLocation] = useState(
    moveFolderOptions[0].id
  );
  const { allFolders, projectId } = useFolders();
  const [internalAllFolders, setInternalAllFolders] = useState(null);

  const moveFolderOnOkHandler = () => {
    onOK(
      primaryMoveLocation === moveFolderOptions[1]?.id ? null : selectedFolder,
      internalAllFolders
    );
  };

  useEffect(() => {
    if (show) setInternalAllFolders(allFolders);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  return (
    <TMModal show={show} withDismissButton onOverlayClick={onClose}>
      <TMModalHeader
        heading={heading}
        subHeading={subHeading}
        handleDismissClick={onClose}
      />
      <TMModalBody>
        {isRootAvailable && (
          <div className="mb-4 flex items-center justify-start pt-1 text-sm">
            <span className="mr-2">Move to: </span>
            <TMRadioGroup
              direction="horizontal"
              onChange={(e, selectedID) => {
                setPrimaryMoveLocation(selectedID);
              }}
              selectedOption={{
                id: primaryMoveLocation
              }}
              options={moveFolderOptions}
            />
          </div>
        )}
        {primaryMoveLocation === moveFolderOptions[0].id ? (
          <div className="border-base-300 mb-4 max-h-64 overflow-auto border">
            <FolderExplorer
              projectId={projectId}
              allFolders={allFolders}
              onFolderClick={(folder) => setSelectedFolder(folder)}
              onFoldersUpdate={(data) => setInternalAllFolders(data)}
            />
          </div>
        ) : null}
        <TMAlerts
          modifier="primary"
          linkText={null}
          description={
            primaryMoveLocation === moveFolderOptions[0].id
              ? alertText
              : 'Selected folder will be moved at root folder.'
          }
        />
      </TMModalBody>
      <TMModalFooter position="right">
        <TMButton colors="white" onClick={onClose} variant="primary">
          Cancel
        </TMButton>
        <TMButton
          variant="primary"
          wrapperClassName="ml-3"
          onClick={moveFolderOnOkHandler}
        >
          {confirmButtonText || 'OK'}
        </TMButton>
      </TMModalFooter>
    </TMModal>
  );
};

FolderExplorerModal.propTypes = {
  show: PropTypes.bool,
  isRootAvailable: PropTypes.bool,
  onClose: PropTypes.func,
  onOK: PropTypes.func,
  heading: PropTypes.string,
  subHeading: PropTypes.string,
  confirmButtonText: PropTypes.string,
  alertText: PropTypes.string
};

FolderExplorerModal.defaultProps = {
  show: false,
  isRootAvailable: false,
  onClose: () => {},
  onOK: () => {},
  heading: '',
  subHeading: '',
  confirmButtonText: '',
  alertText: ''
};

export default FolderExplorerModal;
