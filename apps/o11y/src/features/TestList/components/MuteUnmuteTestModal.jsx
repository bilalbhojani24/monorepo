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
import { toggleMuteTest } from 'features/TestList/slices/testListSlice';
import { o11yNotify } from 'utils/notification';

function UnmuteTestModal() {
  const dispatch = useDispatch();
  const { buildId, testRunId, shouldMute, itemType, onSuccess } =
    useSelector(getModalData);
  const [isUpdating, setIsUpdating] = useState(false);
  const handleCloseModal = () => {
    dispatch(toggleModal({ version: '', data: {} }));
  };
  const handleSubmitChanges = () => {
    setIsUpdating(true);
    dispatch(
      toggleMuteTest({
        buildId,
        testRunId,
        shouldMute
      })
    )
      .unwrap()
      .then(() => {
        o11yNotify({
          title: `Test ${
            itemType === 'mute' ? 'muted' : 'un-muted'
          } successfully!`,
          description: '',
          type: 'success'
        });
        onSuccess?.();
        handleCloseModal();
      })
      .catch(() => {
        o11yNotify({
          title: 'Something went wrong!',
          description: 'There was an error while updating test',
          type: 'error'
        });
      })
      .finally(() => {
        setIsUpdating(false);
      });
  };
  return (
    <O11yModal show size="sm" onClose={handleCloseModal}>
      <O11yModalHeader
        dismissButton
        heading={`${itemType === 'mute' ? 'Mute' : 'Un-mute'} the test case?`}
        handleDismissClick={handleCloseModal}
      />
      <O11yModalBody>
        <p className="text-base-600 text-sm">
          {itemType === 'mute'
            ? 'Muting a test case leads to muted tests not being populated in the build run and insights. You would still be able to view the status of all muted tests using relevant filters.'
            : 'Unmuting a test leads to the test result being populated as part of build result and other build insights.'}
        </p>
      </O11yModalBody>
      <O11yModalFooter position="right">
        <O11yButton colors="white" onClick={handleCloseModal}>
          Cancel
        </O11yButton>
        <O11yButton
          loading={isUpdating}
          isIconOnlyButton={isUpdating}
          onClick={handleSubmitChanges}
          type="submit"
        >
          Confirm
        </O11yButton>
      </O11yModalFooter>
    </O11yModal>
  );
}
export default UnmuteTestModal;
