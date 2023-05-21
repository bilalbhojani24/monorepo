import React, { useContext, useState } from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';

import { FEEDBACK_TYPE, npsConstants } from '../const/feedbackWidgetConst';
import { FeedbackWidgetContextData } from '../context/feedbackWidgetContext';

import FormBuilder from './FormBuilder';

const RenderModal = () => {
  const {
    handleFeedbackClick,
    feedbacktype,
    variationsProps,
    handleClick,
    handleFormSubmit,
    finalFeedbackTypeArray,
    isOpen
  } = useContext(FeedbackWidgetContextData);

  const [selectedNPS, setSelectedNPS] = useState();

  const renderNPSBody = () => (
    <div className="flex items-center justify-center space-x-2">
      {npsConstants.map((item) => (
        <Button
          key={item.id}
          colors={selectedNPS === item.id ? 'brand' : 'white'}
          iconOnly
          onClick={() => {
            setSelectedNPS(item.id);
            handleClick();
          }}
        >
          {item.name}
        </Button>
      ))}
    </div>
  );

  const renderEmojiThumb = () => (
    <div className="flex justify-center space-x-1">
      {finalFeedbackTypeArray().map((item) => (
        <Button
          key={item.label}
          variant="minimal"
          isIconOnlyButton
          onClick={() => {
            handleClick();
            handleFeedbackClick?.(item);
          }}
        >
          {item.icon}
        </Button>
      ))}
    </div>
  );

  return (
    <Modal {...variationsProps.modal} show={isOpen}>
      <ModalHeader
        {...variationsProps.modalHeader}
        heading={feedbacktype.title}
        subHeading={feedbacktype.description}
        icon={feedbacktype.icon}
        wrapperClassName={twClassNames({
          'rounded-b-lg': feedbacktype.type === FEEDBACK_TYPE[4]
        })}
      />

      {feedbacktype.type !== FEEDBACK_TYPE[4] && (
        <ModalBody {...variationsProps.modalBody} className="pb-6 pt-3">
          {/* render thumb or emoji view */}
          {[FEEDBACK_TYPE[0], FEEDBACK_TYPE[2]].includes(feedbacktype.type) &&
            renderEmojiThumb()}

          {/* render nps(number) view */}
          {feedbacktype.type === FEEDBACK_TYPE[3] && renderNPSBody()}

          {/* render form view */}
          {feedbacktype.type === FEEDBACK_TYPE[1] && <FormBuilder />}
        </ModalBody>
      )}

      {feedbacktype.type === FEEDBACK_TYPE[1] && (
        <ModalFooter position="right" backgroundColorClass="bg-base-50 py-3">
          <Button type="submit" onClick={handleFormSubmit}>
            Submit Feedback
          </Button>
        </ModalFooter>
      )}
    </Modal>
  );
};

export default RenderModal;
