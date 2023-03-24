import React from 'react';
import { Button, MdErrorOutline, Modal } from '@browserstack/bifrost';
import PropTypes from 'prop-types';

import { useStartTestErrorTypes } from './StartTestErrorTypes';

const StartTestErrorModal = ({
  showStartTestErrorModal,
  setShowStartTestErrorModal
}) => {
  const { errorUiFragment } = useStartTestErrorTypes();

  return (
    <Modal wrapperClassName="" show={showStartTestErrorModal} size="sm">
      <div className="flex flex-col p-6">
        <div className="flex flex-col items-center justify-center ">
          <div
            className="bg-danger-50 text-danger-600 flex min-h-[48px] min-w-[48px] 
                items-center justify-center rounded-full text-2xl"
          >
            <MdErrorOutline />
          </div>

          {errorUiFragment}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <Button
            onClick={() => {
              setShowStartTestErrorModal(false);
            }}
            fullWidth
            variant="primary"
            colors="white"
            size="default"
          >
            OK
          </Button>
        </div>
      </div>
    </Modal>
  );
};

StartTestErrorModal.propTypes = {
  showStartTestErrorModal: PropTypes.bool,
  setShowStartTestErrorModal: PropTypes.func
};

StartTestErrorModal.defaultProps = {
  showStartTestErrorModal: false,
  setShowStartTestErrorModal: () => {}
};

export default StartTestErrorModal;
