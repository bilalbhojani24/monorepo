import React from 'react';
import { InfoOutlinedIcon } from 'assets/icons';
import {
  TMButton,
  TMModal,
  TMModalFooter,
  TMModalHeader
} from 'common/bifrostProxy';
import PropTypes from 'prop-types';

import useUnsavedChanges from './useUnsavedChanges';

const UnsavedChanges = () => {
  const {
    isUnsavedDataModalVisible,
    modalFocusRef,
    hideUnsavedModal,
    clearUnsavedChangesHandler
  } = useUnsavedChanges();

  return (
    <TMModal
      ref={modalFocusRef}
      show={isUnsavedDataModalVisible}
      withDismissButton
      onOverlayClick={hideUnsavedModal}
    >
      <TMModalHeader
        heading="You have unsaved changes"
        subHeading="Are you sure you want to exit? Your unsaved changes will be discarded."
        handleDismissClick={hideUnsavedModal}
        iconWrapperClassname="bg-brand-100"
        icon={<InfoOutlinedIcon className="text-brand-600" />}
      />
      <TMModalFooter position="right">
        <TMButton
          variant="primary"
          colors="white"
          onClick={hideUnsavedModal}
          ref={modalFocusRef}
        >
          Go Back
        </TMButton>
        <TMButton
          variant="primary"
          colors="brand"
          wrapperClassName="ml-3"
          onClick={clearUnsavedChangesHandler}
        >
          Discard Changes
        </TMButton>
      </TMModalFooter>
    </TMModal>
  );
};

UnsavedChanges.propTypes = {
  show: PropTypes.bool
};

UnsavedChanges.defaultProps = {
  show: false
};

export default UnsavedChanges;
