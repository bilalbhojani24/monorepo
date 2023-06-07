import React from 'react';
import { useDispatch } from 'react-redux';
import {
  O11yButton,
  O11yModal,
  O11yModalBody,
  O11yModalFooter,
  O11yModalHeader
} from 'common/bifrostProxy';
import { toggleModal } from 'common/ModalToShow/slices/modalToShowSlice';

function ReqFrameworkModal() {
  const dispatch = useDispatch();
  const handleCloseModal = () => {
    dispatch(toggleModal({ version: '', data: {} }));
  };
  return (
    <O11yModal show size="sm" onClose={handleCloseModal}>
      <O11yModalHeader
        dismissButton
        heading="Select framework"
        handleDismissClick={handleCloseModal}
      />
      <O11yModalBody>
        {/* <p className="text-base-600 mb-3 text-sm">Select an option to re run</p> */}
      </O11yModalBody>
      <O11yModalFooter position="right">
        <O11yButton colors="white" onClick={handleCloseModal}>
          Cancel
        </O11yButton>
        <O11yButton
          // loading={isUpdating}
          // isIconOnlyButton={isUpdating}
          // onClick={handleSubmitChanges}
          type="submit"
        >
          Confirm
        </O11yButton>
      </O11yModalFooter>
    </O11yModal>
  );
}

export default ReqFrameworkModal;
