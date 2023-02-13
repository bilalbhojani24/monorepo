// TODO: after success, rearrange the folder, challenge updatedfolder structure to be fetched in allFolders

import React, { useEffect, useState } from 'react';
import {
  TMAlerts,
  TMButton,
  TMModal,
  TMModalBody,
  TMModalFooter,
  TMModalHeader
} from 'common/bifrostProxy';
import FolderExplorer from 'common/FolderExplorer';
import PropTypes from 'prop-types';

import useFolders from './useFolders';

const FolderExplorerModal = ({
  show,
  heading,
  subHeading,
  alertText,
  onOK,
  onClose
}) => {
  const [selectedFolder, setSelectedFolder] = useState(null);
  const { allFolders, projectId } = useFolders();
  const [internalAllFolders, setInternalAllFolders] = useState(null);

  const moveFolderOnOkHandler = () => {
    onOK(selectedFolder, internalAllFolders);
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
        <div className="border-base-300 mb-4 max-h-72 overflow-auto border">
          <FolderExplorer
            projectId={projectId}
            allFolders={allFolders}
            onFolderClick={(folder) => setSelectedFolder(folder)}
            onFoldersUpdate={(data) => setInternalAllFolders(data)}
          />
        </div>
        <TMAlerts modifier="primary" linkText={null} description={alertText} />
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
          Move Folder
        </TMButton>
      </TMModalFooter>
    </TMModal>
  );
};

FolderExplorerModal.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
  onOK: PropTypes.func,
  heading: PropTypes.string,
  subHeading: PropTypes.string,
  alertText: PropTypes.string
};

FolderExplorerModal.defaultProps = {
  show: false,
  onClose: () => {},
  onOK: () => {},
  heading: '',
  subHeading: '',
  alertText: ''
};

export default FolderExplorerModal;
