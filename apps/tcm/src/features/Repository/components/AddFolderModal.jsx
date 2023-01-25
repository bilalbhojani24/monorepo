// if folderId exists then it is a subfolder creation

import React, { useEffect, useState } from 'react';
import { addFolder, addSubFolder } from 'api/folders.api';
import {
  TMButton,
  TMInputField,
  TMModal,
  TMModalBody,
  TMModalFooter,
  TMModalHeader,
  TMTextArea
} from 'common/bifrostProxy';
import PropTypes from 'prop-types';

import useFolders from './useFolders';

const AddFolderModal = ({ projectId, show, folderId, isSubFolder }) => {
  const { hideFolderModal, updateFolders } = useFolders();
  const [filledFormData, setFormData] = useState({
    name: '',
    notes: ''
  });

  const createFolderHandler = () => {
    if (folderId)
      addSubFolder({
        projectId,
        folderId,
        payload: filledFormData
      }).then((item) => {
        if (item.data?.folder) updateFolders(item.data.folder, folderId);
        hideFolderModal();
      });
    else
      addFolder({
        projectId,
        payload: filledFormData
      }).then((item) => {
        if (item.data?.folder) updateFolders(item.data.folder);
        hideFolderModal();
      });
  };

  useEffect(() => {
    if (show)
      setFormData({
        name: '',
        notes: ''
      });
  }, [show]);

  return (
    <TMModal show={show} withDismissButton onOverlayClick={hideFolderModal}>
      <TMModalHeader
        heading={isSubFolder ? 'Add Sub Folder' : 'Add Folder'}
        handleDismissClick={hideFolderModal}
      />
      <TMModalBody>
        <div className="mb-4">
          <TMInputField
            wrapperClass="mb-2"
            label="Folder name"
            placeholder="Folder Name 01"
            value={filledFormData.name}
            onChange={(e) =>
              setFormData({ ...filledFormData, name: e.currentTarget.value })
            }
          />
        </div>
        <TMTextArea
          label="Description"
          placeholder="Enter folder description/notes"
          value={filledFormData.notes}
          onChange={(e) =>
            setFormData({ ...filledFormData, notes: e.currentTarget.value })
          }
        />
      </TMModalBody>
      <TMModalFooter position="right">
        <TMButton colors="white" onClick={hideFolderModal} variant="primary">
          Cancel
        </TMButton>
        <TMButton
          variant="primary"
          wrapperClassName="ml-3"
          onClick={createFolderHandler}
        >
          {isSubFolder ? 'Add Sub Folder' : 'Add Folder'}
        </TMButton>
      </TMModalFooter>
    </TMModal>
  );
};

AddFolderModal.propTypes = {
  projectId: PropTypes.string.isRequired,
  folderId: PropTypes.number,
  show: PropTypes.bool,
  isSubFolder: PropTypes.bool
};

AddFolderModal.defaultProps = {
  show: false,
  isSubFolder: false,
  folderId: null
};

export default AddFolderModal;
