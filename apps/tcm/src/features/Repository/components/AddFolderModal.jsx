import React, { useState } from 'react';
import { Button, InputField, Modal } from '@browserstack/bifrost';
import { addFolder } from 'api/folders.api.js';
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
    <Modal
      show
      withDismissButton
      handleDismissButtonClick={hideAddFolderModal}
      onClose={hideAddFolderModal}
    >
      <InputField
        wrapperClass="mb-2"
        label="Folder name"
        placeholder="Folder Name 01"
        value={filledFormData.name}
        onChange={(e) =>
          setFormData({ ...filledFormData, name: e.currentTarget.value })
        }
      />
      <InputField
        label="Description"
        placeholder="Enter folder description/notes"
        value={filledFormData.notes}
        onChange={(e) =>
          setFormData({ ...filledFormData, notes: e.currentTarget.value })
        }
      />
      <div className="mt-3 flex justify-end">
        <Button variant="white" onClick={hideAddFolderModal}>
          Cancel
        </Button>
        <Button
          variant="primary"
          wrapperClassName="ml-3"
          onClick={createFolderHandler}
        >
          Create Folder
        </Button>
      </div>
    </Modal>
  );
};

AddFolderModal.propTypes = {
  projectId: PropTypes.string.isRequired,
};

export default AddFolderModal;
