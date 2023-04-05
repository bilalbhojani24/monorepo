import React from 'react';
import {
  Button,
  InputField,
  MdClose,
  MdThumbDown,
  MdThumbUp,
  Modal,
  TextArea
} from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';

import useFeedbackModal from './useFeedbackModal';

const FeedbackModal = () => {
  const {
    showFeedbackModal,
    closeFeedbackModal,
    hasUserLiked,
    setUserLiked,
    emailValue,
    emailValueChanged,
    emailErrorText,
    isUserLoggedIn,
    textareaValue,
    textareaValueChanged
  } = useFeedbackModal();

  return (
    <Modal wrapperClassName="" show={showFeedbackModal} size="xl">
      <div className="flex flex-col p-6">
        <div className="flex flex-col">
          <div className="mb-5 flex flex-col">
            <div className="mb-3 flex font-medium">
              <div>
                Please tell us your experience with BrowserStack AppPerformance
                so far?
              </div>

              <div className="text-base-500 text-xl">
                <MdClose onClick={closeFeedbackModal} />
              </div>
            </div>

            <div className="flex">
              <div className="mr-3">
                <Button
                  onClick={() => {
                    setUserLiked('YES');
                  }}
                  isIconOnlyButton
                  icon={
                    <div
                      className={twClassNames('flex text-xl', {
                        'text-success-600': hasUserLiked === 'YES'
                      })}
                    >
                      <MdThumbUp />
                    </div>
                  }
                  variant="rounded"
                  colors="white"
                  size="extra-large"
                />
              </div>

              <div>
                <Button
                  onClick={() => {
                    setUserLiked('NO');
                  }}
                  isIconOnlyButton
                  icon={
                    <div
                      className={twClassNames('flex text-xl', {
                        'text-danger-600': hasUserLiked === 'NO'
                      })}
                    >
                      <MdThumbDown />
                    </div>
                  }
                  variant="rounded"
                  colors="white"
                  size="extra-large"
                />
              </div>
            </div>
          </div>

          {!isUserLoggedIn && (
            <div className="mb-5 flex flex-col">
              <InputField
                id="feedbackEmailInput"
                label="Email ID"
                className="w-full"
                placeholder="Enter Email"
                rows={4}
                onChange={emailValueChanged}
                value={emailValue}
                errorText={emailErrorText}
              />
            </div>
          )}

          <div className="mb-5 flex flex-col">
            <TextArea
              id="feedbackTextArea"
              label="How can we Improve ?"
              className="w-full"
              placeholder="Your Feedback..."
              rows={4}
              onChange={textareaValueChanged}
              value={textareaValue}
            />
          </div>

          <div className="flex">
            <Button
              onClick={closeFeedbackModal}
              variant="primary"
              colors="brand"
              size="default"
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default FeedbackModal;
