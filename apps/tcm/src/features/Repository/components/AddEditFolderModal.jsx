// if folderId exists then it is a subfolder creation

import React, { useEffect } from 'react';
import {
  TMButton,
  TMInputField,
  TMModal,
  TMModalBody,
  TMModalFooter,
  TMModalHeader,
  TMRichTextEditor
} from 'common/bifrostProxy';
import PropTypes from 'prop-types';
import { onSubmitKeyHandler } from 'utils/helperFunctions';

import useAddEditFolderModal from './useAddEditFolderModal';

const AddEditFolderModal = ({
  projectId,
  show,
  folderId,
  isSubFolder,
  isEditFolder,
  currentData
}) => {
  const functionName = isEditFolder ? 'Edit' : 'Create';
  const {
    modalFocusRef,
    filledFormData,
    formError,
    setFormError,
    setFormData,
    hideFolderModal,
    createFolderHandler
  } = useAddEditFolderModal({ folderId, isSubFolder, isEditFolder });

  useEffect(() => {
    if (show)
      setFormData({
        name: '',
        notes: ''
      });
  }, [setFormData, show]);

  useEffect(() => {
    if (currentData) {
      setFormData({
        name: currentData?.name,
        notes: currentData?.notes
      });
    }
  }, [currentData, setFormData]);

  return (
    <TMModal
      show={show}
      withDismissButton
      onOverlayClick={hideFolderModal}
      ref={modalFocusRef}
    >
      <TMModalHeader
        heading={
          isSubFolder ? `${functionName} Sub Folder` : `${functionName} Folder`
        }
        handleDismissClick={hideFolderModal}
      />
      <TMModalBody>
        <div className="mb-4">
          <TMInputField
            wrapperClassName="mb-2"
            label="Folder name"
            placeholder="Enter Folder Name"
            value={filledFormData.name}
            errorText={formError.nameError}
            ref={modalFocusRef}
            onKeyDown={(e) => onSubmitKeyHandler(e, createFolderHandler)}
            onChange={(e) => {
              if (formError?.nameError && e.currentTarget.value.length) {
                setFormError({ ...formError, nameError: '' });
              }
              setFormData({ ...filledFormData, name: e.currentTarget.value });
            }}
          />
        </div>
        <div className="pb-1">
          <TMRichTextEditor
            label="Description"
            id="Description"
            value={filledFormData.notes}
            height={200}
            placeholder="Enter folder description/notes"
            onChange={(val) => setFormData({ ...filledFormData, notes: val })}
            projectId={projectId}
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
