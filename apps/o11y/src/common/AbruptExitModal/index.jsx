import React from 'react';
import {
  O11yButton,
  O11yModal,
  O11yModalBody,
  O11yModalFooter,
  O11yModalHeader
} from 'common/bifrostProxy';
import PropTypes from 'prop-types';

function AbruptExitModal({ isAbruptModalOpen, onGoBack, onDiscard }) {
  return (
    <O11yModal show={isAbruptModalOpen} size="sm">
      <O11yModalHeader
        heading="You have unsaved changes"
        dismissButton={false}
      />

      <O11yModalBody>
        <p className="flex gap-1 text-sm font-medium leading-5">
          Are you sure you want to exit? Your changes will be discarded.
        </p>
      </O11yModalBody>

      <O11yModalFooter position="right">
        <O11yButton colors="white" onClick={onGoBack}>
          Go back
        </O11yButton>
        <O11yButton colors="danger" onClick={onDiscard} type="submit">
          Discard changes
        </O11yButton>
      </O11yModalFooter>
    </O11yModal>
  );
}

AbruptExitModal.propTypes = {
  isAbruptModalOpen: PropTypes.bool.isRequired,
  onGoBack: PropTypes.func.isRequired,
  onDiscard: PropTypes.func.isRequired
};

export default AbruptExitModal;
