/* eslint-disable no-console */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  O11yButton,
  O11yModal,
  O11yModalBody,
  O11yModalFooter,
  O11yModalHeader,
  O11yRadioSmallCards
} from 'common/bifrostProxy';
import { toggleModal } from 'common/ModalToShow/slices/modalToShowSlice';
import { getModalData } from 'common/ModalToShow/slices/selectors';
import { getBuildMeta } from 'features/BuildDetails/slices/selectors';
// import { o11yNotify } from 'utils/notification';

function BulkTaggingModal() {
  const dispatch = useDispatch();
  const { buildId, testRunId, clusterId, onSuccess } =
    useSelector(getModalData);
  const { data: buildMeta } = useSelector(getBuildMeta);
  const availableIssueTypes = buildMeta?.issueTypes;
  const [isUpdating, setIsUpdating] = useState(false);
  const handleCloseModal = () => {
    dispatch(toggleModal({ version: '', data: {} }));
  };
  const handleSubmitChanges = () => {
    setIsUpdating(true);
    console.log('submit changes');
    console.log('testRunId', testRunId);
    console.log('buildId', buildId);
    console.log('clusterId', clusterId);
    console.log('onSuccess', onSuccess);
  };
  return (
    <O11yModal show size="3xl" onClose={handleCloseModal}>
      <O11yModalHeader
        dismissButton
        heading="Bulk update failure category"
        handleDismissClick={handleCloseModal}
      />
      <O11yModalBody>
        <p className="text-base-900 text-sm">Failure category options</p>
        <div className="mb-8">
          <O11yRadioSmallCards
            heading=""
            options={availableIssueTypes.map((el) => ({ name: el.name }))}
          />
        </div>
        <p className="text-base-900 text-base">Bulk Select</p>
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
          Apply
        </O11yButton>
      </O11yModalFooter>
    </O11yModal>
  );
}

export default BulkTaggingModal;
