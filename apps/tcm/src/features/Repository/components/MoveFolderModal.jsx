// TODO: after success, rearrange the folder, challenge updatedfolder structure to be fetched in allFolders

import React, { useEffect, useState } from 'react';
import { moveFolder } from 'api/folders.api';
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

const MoveFolderModal = ({ show }) => {
  const [selectedFolder, setSelectedFolder] = useState(null);
  const { hideFolderModal, allFolders, projectId, folderId, moveFolderHelper } =
    useFolders();
  const [internalAllFolders, setInternalAllFolders] = useState(null);

  const moveFolderOnOkHandler = () => {
    if (selectedFolder?.id) {
      moveFolder({
        projectId,
        folderId,
        newParentFolderId: selectedFolder.id
      }).then((data) => {
        moveFolderHelper(folderId, selectedFolder.id, internalAllFolders);
        hideFolderModal();
      });
    }
  };

  useEffect(() => {
    if (show) setInternalAllFolders(allFolders);
  }, [show]);

  return (
    <TMModal show={show} withDismissButton onOverlayClick={hideFolderModal}>
      <TMModalHeader
        heading="Move Folder"
        subHeading="Choose desired folder where you want to move the folder:"
        handleDismissClick={hideFolderModal}
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
        <TMAlerts
          modifier="primary"
          linkText={null}
          description="The selected folder will be moved from the current location to the above selected folder."
        />
      </TMModalBody>
      <TMModalFooter position="right">
        <TMButton colors="white" onClick={hideFolderModal} variant="primary">
          Cancel
        </TMButton>
        <TMButton
          variant="primary"
          wrapperClassName="ml-3"
          onClick={moveFolderOnOkHandler}
        >
          OK
        </TMButton>
      </TMModalFooter>
    </TMModal>
  );
};

MoveFolderModal.propTypes = {
  show: PropTypes.bool
};

MoveFolderModal.defaultProps = {
  show: false
};

export default MoveFolderModal;
