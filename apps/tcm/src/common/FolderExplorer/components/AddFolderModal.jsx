import React, { useEffect } from 'react';
import {
  TMButton,
  TMInputField,
  TMModal,
  TMModalBody,
  TMModalFooter,
  TMModalHeader,
  TMTextArea
} from 'common/bifrostProxy';
import _debounce from 'lodash/debounce';
import PropTypes from 'prop-types';
import { onSubmitKeyHandler } from 'utils/helperFunctions';

import useAddFolderModal from './useAddFolderModal';

const AddFolderModal = ({
  projectId,
  show,
  folderId,
  isSubFolder,
  hideModal,
  onNewFolderCreated
}) => {
  const {
    modalFocusRef,
    filledFormData,
    formError,
    loaders,
    setFormError,
    setFormData,
    hideFolderModal,
    createFolderHandler
  } = useAddFolderModal({
    projectId,
    folderId,
    isSubFolder,
    hideModal,
    onNewFolderCreated
  });

  useEffect(() => {
    if (show)
      setFormData({
        name: '',
        notes: ''
      });
  }, [setFormData, show]);

  return (
    <TMModal
      show={show}
      withDismissButton
      onOverlayClick={hideFolderModal}
      ref={modalFocusRef}
    >
      <TMModalHeader
        heading="Create Folder"
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
            onKeyDown={_debounce(
              (e) => onSubmitKeyHandler(e, createFolderHandler),
              500
            )}
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
          onClick={_debounce(createFolderHandler, 500)}
          isIconOnlyButton={loaders.createFolderCta}
          loading={loaders.createFolderCta}
        >
          Create Folder
        </TMButton>
      </TMModalFooter>
    </TMModal>
  );
};

AddFolderModal.propTypes = {
  projectId: PropTypes.string.isRequired,
  folderId: PropTypes.number,
  show: PropTypes.bool,
  isSubFolder: PropTypes.bool,
  hideModal: PropTypes.func,
  onNewFolderCreated: PropTypes.func
};

AddFolderModal.defaultProps = {
  show: false,
  isSubFolder: false,
  hideModal: () => {},
  folderId: null,
  onNewFolderCreated: () => {}
};

export default AddFolderModal;
