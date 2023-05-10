import React, { useContext, useState } from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  RadioSmallCards
} from '@browserstack/bifrost';

import { feedbackType, npsConstants } from '../const/feedbackWidgetConst';
import { FeedbackWidgetContextData } from '../context/feedbackWidgetContext';

import FormBuilder from './FormBuilder';

const RenderModal = () => {
  const {
    title,
    handleFeedbackClick,
    description,
    arrayType,
    type,
    variationsProps
  } = useContext(FeedbackWidgetContextData);

  const [selectedNPS, setSelectedNPS] = useState({});

  return (
    <Modal {...variationsProps.modal}>
      <ModalHeader
        {...variationsProps.modalHeader}
        heading={title}
        subHeading={description}
      />
      <ModalBody {...variationsProps.modalBody} className="py-4">
        {[feedbackType[0], feedbackType[2]].includes(type) && (
          <div className="flex justify-center space-x-1">
            {arrayType().map((item) => (
              <Button
                key={item.label}
                variant="minimal"
                isIconOnlyButton
                onClick={() => handleFeedbackClick?.(item)}
              >
                {item.icon}
              </Button>
            ))}
          </div>
        )}
        {type === 'nps' && (
          <RadioSmallCards
            value={selectedNPS}
            onChange={(e) => {
              setSelectedNPS(e);
              handleFeedbackClick?.(e);
            }}
            columnWrapperClassName="sm:grid-cols-10 gap-[2px]"
            cardWrapperClassName="!ring-0"
            options={npsConstants}
          />
        )}
        {type === 'form' && <FormBuilder />}
      </ModalBody>
      {type === 'form' && (
        <ModalFooter position="right" backgroundColorClass="bg-base-50">
          <Button>Submit Feedback</Button>
        </ModalFooter>
      )}
    </Modal>
  );
};

export default RenderModal;
