// if folderId exists then it is a subfolder creation

import React, { useEffect, useState } from 'react';
import { addFolder, addSubFolder, renameFolder } from 'api/folders.api';
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

const AddEditFolderModal = ({
  projectId,
  show,
  folderId,
  isSubFolder,
  isEditFolder,
  currentData
}) => {
  const functionName = isEditFolder ? 'Edit' : 'Add';
  const { hideFolderModal, updateFolders, renameFolderHelper } = useFolders();
  const [filledFormData, setFormData] = useState({
    name: '',
    notes: ''
  });

  const createFolderHandler = () => {
    if (isSubFolder && folderId) {
      addSubFolder({
        projectId,
        folderId,
        payload: filledFormData
      }).then((item) => {
        if (item.data?.folder) updateFolders(item.data.folder, folderId);
        hideFolderModal();
      });
    } else if (isEditFolder && folderId) {
      renameFolder({
        projectId,
        folderId,
        payload: filledFormData
      }).then((item) => {
        if (item.data?.folder) renameFolderHelper(item.data.folder, folderId);
        hideFolderModal();
      });
    } else {
      addFolder({
        projectId,
        payload: filledFormData
      }).then((item) => {
        if (item.data?.folder) updateFolders(item.data.folder);
        hideFolderModal();
      });
    }
  };

  useEffect(() => {
    if (show)
      setFormData({
        name: '',
        notes: ''
      });
  }, [show]);

  useEffect(() => {
    if (currentData) {
      setFormData({
        name: currentData?.name,
        notes: currentData?.notes
      });
    }
  }, [currentData]);

  return (
    <TMModal show={show} withDismissButton onOverlayClick={hideFolderModal}>
      <TMModalHeader
        heading={
          isSubFolder ? `${functionName} Sub Folder` : `${functionName} Folder`
        }
        handleDismissClick={hideFolderModal}
      />
      <TMModalBody>
        <div className="mb-4">
          <TMInputField
            wrapperClass="mb-2"
            label="Folder name"
            placeholder="Enter Folder Name"
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
          {isSubFolder
            ? `${functionName} Sub Folder`
            : `${functionName} Folder`}
        </TMButton>
      </TMModalFooter>
    </TMModal>
  );
};

AddEditFolderModal.propTypes = {
  projectId: PropTypes.string.isRequired,
  folderId: PropTypes.number,
  show: PropTypes.bool,
  isSubFolder: PropTypes.bool,
  isEditFolder: PropTypes.bool,
  currentData: PropTypes.objectOf()
};

AddEditFolderModal.defaultProps = {
  show: false,
  isSubFolder: false,
  isEditFolder: false,
  folderId: null,
  currentData: null
};

export default AddEditFolderModal;
