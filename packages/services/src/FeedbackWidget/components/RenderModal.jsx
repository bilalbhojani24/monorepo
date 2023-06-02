import React, { useContext } from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';

import { FEEDBACK_TYPE } from '../const/feedbackWidgetConst';
import { FeedbackWidgetContextData } from '../context/feedbackWidgetContext';
import { closeFeedbackWidget } from '../index';

import FormBuilder from './FormBuilder';
import RenderNpsBody from './RenderNpsBody';
import RenderThumb from './RenderThumb';

const RenderModal = () => {
  const { feedbacktype, handleFormSubmit, isOpen } = useContext(
    FeedbackWidgetContextData
  );

  return (
    <Modal show={isOpen}>
      <ModalHeader
        heading={feedbacktype.title}
        subHeading={feedbacktype.description}
        icon={feedbacktype.icon}
        wrapperClassName={twClassNames({
          'rounded-b-lg': feedbacktype.type === FEEDBACK_TYPE[4]
        })}
        handleDismissClick={() => closeFeedbackWidget(false)}
        iconWrapperClassname="bg-transparent"
      />

      {feedbacktype.type !== FEEDBACK_TYPE[4] && (
        <ModalBody className="pb-6 pt-3">
          {/* render thumb or emoji view */}
          {[FEEDBACK_TYPE[0], FEEDBACK_TYPE[2]].includes(feedbacktype.type) && (
            <RenderThumb />
          )}

          {/* render nps(number) view */}
          {feedbacktype.type === FEEDBACK_TYPE[3] && <RenderNpsBody />}

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
