import React from 'react';
import { Button, MdErrorOutline, Modal } from '@browserstack/bifrost';

import { useStartTestErrorTypes } from './StartTestErrorTypes';

const StartTestErrorModal = () => {
  const { showStartTestErrorModal, errorUiFragment, closeStartTestErrorModal } =
    useStartTestErrorTypes();

  return (
    <Modal wrapperClassName="" show={showStartTestErrorModal} size="sm">
      <div className="flex flex-col p-6">
        <div className="flex flex-col items-center justify-center text-center">
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
            onClick={closeStartTestErrorModal}
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

export default StartTestErrorModal;
