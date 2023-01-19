import React, { useState } from 'react';
import { addFolder } from 'api/folders.api';
import {
  TMButton,
  TMInputField,
  TMModal,
  TMModalBody,
  TMModalFooter,
  TMModalHeader,
  TMTextArea,
} from 'common/bifrostProxy';
import PropTypes from 'prop-types';

import useFolders from './useFolders';

const AddFolderModal = ({ projectId }) => {
  const { hideAddFolderModal, updateFolders } = useFolders();
  const [filledFormData, setFormData] = useState({
    name: '',
    notes: '',
  });

  const createFolderHandler = () => {
    addFolder({
      projectId,
      payload: filledFormData,
    }).then((item) => {
      if (item.data?.folder) updateFolders(item.data.folder);
      hideAddFolderModal();
    });
  };

  return (
    <TMModal show withDismissButton onOverlayClick={hideAddFolderModal}>
      <TMModalHeader
        heading="Add Folder"
        handleDismissClick={hideAddFolderModal}
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
        <TMButton colors="white" onClick={hideAddFolderModal} variant="primary">
          Cancel
        </TMButton>
        <TMButton
          variant="primary"
          wrapperClassName="ml-3"
          onClick={createFolderHandler}
        >
          Add Folder
        </TMButton>
      </TMModalFooter>
    </TMModal>
  );
};

AddFolderModal.propTypes = {
  projectId: PropTypes.string.isRequired,
};

export default AddFolderModal;
