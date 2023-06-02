import React from 'react';
import { Button, Modal, ModalFooter, ModalHeader } from '@browserstack/bifrost';
import Add from 'assets/add_icon.svg';
import { getModalDetails, TRIAL_IN_PROGRESS } from 'constants';

import useReverseTrialModal from './useReverseTrialModal';

export default function ReverseTrialModalWrapper() {
  const {
    showModal,
    handleModalClose,
    modalName,
    trialState,
    handleButtonClick
  } = useReverseTrialModal();

  if (!modalName) return null;

  const { heading, subHeading, placeholderImage, content, buttonText } =
    getModalDetails[modalName];

  return (
    <Modal wrapperClassName="py-3" show={showModal} size="lg">
      <ModalHeader
        dismissButton
        heading={heading}
        subHeading={subHeading}
        handleDismissClick={handleModalClose}
      />
      <div className="px-6">
        <img src={placeholderImage} alt="modal placeholder" />
        <ul className="mt-4">
          {content?.map((item) => (
            <li className="mb-3 flex items-start gap-3" key={item}>
              <img className="mt-[6px]" src={Add} alt="add icon" />
              <p className="w-[392px] text-sm">{item}</p>
            </li>
          ))}
        </ul>
      </div>
      <ModalFooter>
        <Button
          colors="success"
          wrapperClassName="py-2"
          fullWidth
          loading={trialState === TRIAL_IN_PROGRESS}
          isIconOnlyButton={trialState === TRIAL_IN_PROGRESS}
          onClick={() => handleButtonClick(modalName)}
        >
          {trialState !== TRIAL_IN_PROGRESS ? buttonText : ''}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
