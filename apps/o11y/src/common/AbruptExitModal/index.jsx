import React from 'react';
import {
  O11yButton,
  O11yModal,
  O11yModalBody,
  O11yModalFooter,
  O11yModalHeader
} from 'common/bifrostProxy';
import PropTypes from 'prop-types';

function AbruptExitModal({
  isAbruptModalOpen,
  onGoBack,
  onDiscard,
  title,
  subtitle,
  confirmCtaText
}) {
  return (
    <O11yModal show={isAbruptModalOpen} size="sm">
      <O11yModalHeader heading={title} dismissButton={false} />

      <O11yModalBody>
        <p className="flex gap-1 text-sm font-medium leading-5">{subtitle}</p>
      </O11yModalBody>

      <O11yModalFooter position="right">
        <O11yButton colors="white" onClick={onGoBack}>
          Go back
        </O11yButton>
        <O11yButton colors="danger" onClick={onDiscard} type="submit">
          {confirmCtaText}
        </O11yButton>
      </O11yModalFooter>
    </O11yModal>
  );
}

AbruptExitModal.propTypes = {
  isAbruptModalOpen: PropTypes.bool.isRequired,
  onGoBack: PropTypes.func.isRequired,
  onDiscard: PropTypes.func.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  confirmCtaText: PropTypes.string
};

AbruptExitModal.defaultProps = {
  title: 'You have unsaved changes',
  subtitle: 'Are you sure you want to exit? Your changes will be discarded.',
  confirmCtaText: ' Discard changes'
};

export default AbruptExitModal;
