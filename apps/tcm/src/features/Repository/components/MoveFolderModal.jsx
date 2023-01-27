// if folderId exists then it is a subfolder creation

import React, { useEffect, useState } from 'react';
import { addFolder } from 'api/folders.api';
import {
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
  const { hideFolderModal, allFolders, projectId } = useFolders();

  const editFolderHandler = () => {
    debugger;
  };

  return (
    <TMModal show={show} withDismissButton onOverlayClick={hideFolderModal}>
      <TMModalHeader
        heading="Move Folder"
        subHeading="Choose desired folder where you want to move the folder:"
        handleDismissClick={hideFolderModal}
      />
      <TMModalBody>
        <div className="border-base-300 border">
          <FolderExplorer
            projectId={projectId}
            allFolders={allFolders}
            // onFolderClick={folderClickHandler}
          />
        </div>
      </TMModalBody>
      <TMModalFooter position="right">
        <TMButton colors="white" onClick={hideFolderModal} variant="primary">
          Cancel
        </TMButton>
        <TMButton
          variant="primary"
          wrapperClassName="ml-3"
          onClick={editFolderHandler}
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
