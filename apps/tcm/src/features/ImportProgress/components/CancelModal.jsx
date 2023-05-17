import React from 'react';
import { MdClose } from '@browserstack/bifrost';
import {
  TMButton,
  TMModal,
  TMModalBody,
  TMModalFooter
} from 'common/bifrostProxy';
import PropTypes from 'prop-types';

import useCancelModal from './useCancelModal';

const CancelModal = ({ show }) => {
  const { closeCancelModal, handleCancelQuickImport, testTool } =
    useCancelModal();
  return (
    <TMModal show={show} size="xl" onOverlayClick={closeCancelModal}>
      <TMModalBody className="py-5">
        <div>
          <div className="bg-danger-100 mx-auto flex h-12 w-12 items-center justify-center rounded-full">
            <MdClose className="text-danger-600 h-6 w-6" aria-hidden="true" />
          </div>
          <div className="mt-5 text-center">
            <h3 as="h3" className="text-base-900 text-lg font-medium leading-6">
              Are you sure you want to cancel this import?
            </h3>
            <div className="text-base-500 mt-2 flex flex-col text-sm">
              <p>{`You currently have projects being imported from ${
                testTool === 'zephyr' ? 'Zephyr Scale' : 'TestRails'
              }.`}</p>
              <p>
                If you wish to cancel the import right now, you will have to
                start from beginning again.
              </p>
            </div>
          </div>
        </div>
      </TMModalBody>
      <TMModalFooter position="center">
        <TMButton colors="white" fullWidth onClick={closeCancelModal}>
          Back
        </TMButton>
        <TMButton fullWidth colors="danger" onClick={handleCancelQuickImport}>
          Cancel Import
        </TMButton>
      </TMModalFooter>
    </TMModal>
  );
};

CancelModal.propTypes = {
  show: PropTypes.bool
};

CancelModal.defaultProps = {
  show: false
};

export default CancelModal;
