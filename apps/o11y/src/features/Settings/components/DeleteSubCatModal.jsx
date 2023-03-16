import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  O11yButton,
  O11yModal,
  O11yModalBody,
  O11yModalFooter,
  O11yModalHeader
} from 'common/bifrostProxy';
import { toggleModal } from 'common/ModalToShow/slices/modalToShowSlice';
import { getModalData } from 'common/ModalToShow/slices/selectors';
import { getActiveProject } from 'globalSlice/selectors';
import { o11yNotify } from 'utils/notification';

import { deleteSubCatById } from '../slices/failureCategoriesSettings';

function DeleteSubCatModal() {
  const modalData = useSelector(getModalData);
  const activeProject = useSelector(getActiveProject);
  const [isDeletingCategory, setIsDeletingCategory] = useState(false);

  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(toggleModal({ version: '', data: {} }));
  };

  const handleSubmitChanges = () => {
    setIsDeletingCategory(true);
    dispatch(
      deleteSubCatById({
        subCatId: modalData.subCatId,
        category: modalData.category,
        projectNormalisedName: activeProject.normalisedName
      })
    )
      .unwrap()
      .then(() => {
        o11yNotify({
          title: 'Successfully deleted',
          description: 'Category was deleted successfully',
          type: 'success'
        });
        handleCloseModal();
      })
      .catch(() => {
        o11yNotify({
          title: 'Something went wrong!',
          description: 'There was an error while deleting category',
          type: 'error'
        });
      })
      .finally(() => {
        setIsDeletingCategory(false);
      });
  };
  return (
    <O11yModal show size="sm" onClose={handleCloseModal}>
      <O11yModalHeader
        dismissButton
        heading="Delete Category"
        handleDismissClick={handleCloseModal}
      />

      <O11yModalBody>
        <p className="flex gap-1 text-sm font-medium leading-5">
          Are you sure you want to delete this category?
        </p>
      </O11yModalBody>

      <O11yModalFooter position="right">
        <O11yButton colors="white" onClick={handleCloseModal}>
          Cancel
        </O11yButton>
        <O11yButton
          colors="danger"
          loading={isDeletingCategory}
          isIconOnlyButton={isDeletingCategory}
          onClick={handleSubmitChanges}
          type="submit"
        >
          Delete
        </O11yButton>
      </O11yModalFooter>
    </O11yModal>
  );
}

export default DeleteSubCatModal;
