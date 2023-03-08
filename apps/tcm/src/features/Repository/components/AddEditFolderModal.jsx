// if folderId exists then it is a subfolder creation

import React, { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
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
import {
  // attachEventListener,
  // detachEventListener,
  onSubmitKeyHandler
} from 'utils/helperFunctions';

// import { setFolderModalConf } from '../slices/repositorySlice';
import useAddEditFolderModal from './useAddEditFolderModal';

const AddEditFolderModal = ({
  projectId,
  show,
  folderId,
  isSubFolder,
  isEditFolder,
  currentData
}) => {
  const functionName = isEditFolder ? 'Update' : 'Create';
  const {
    modalFocusRef,
    filledFormData,
    formError,
    setFormError,
    setFormData,
    hideFolderModal,
    createFolderHandler
  } = useAddEditFolderModal({ folderId, isSubFolder, isEditFolder });
  // const dispatch = useDispatch();

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

  // useEffect(() => {
  //   const handleKeyDown = (e) => {
  //     if (e.key === 'Escape') dispatch(setFolderModalConf(false));
  //   };
  //   if (show) attachEventListener(document, 'keydown', handleKeyDown);
  //   if (!show) detachEventListener(document, 'keydown', handleKeyDown);
  //   return () => {
  //     detachEventListener(document, 'keydown', handleKeyDown);
  //   };
  // }, [show, dispatch]);

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
            label="Folder name *"
            placeholder="Enter folder name"
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
          <TMTextArea
            id={projectId}
            label="Description"
            placeholder="Enter folder description/notes"
            value={filledFormData.notes}
            onChange={(e) =>
              setFormData({ ...filledFormData, notes: e.currentTarget.value })
            }
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
