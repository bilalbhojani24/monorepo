import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Button } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';

import Notifications from '../../../../bifrost/modules/Notifications/index';
import {
  NotificationsContainer,
  notify
} from '../../../../bifrost/modules/Notifications/notificationsUtils';
import { FEEDBACK_TYPE, npsConstants } from '../const/feedbackWidgetConst';
import { FeedbackWidgetContextData } from '../context/feedbackWidgetContext';

import FeedbackSuccess from './FeedbackSuccess';
import FormBuilder from './FormBuilder';

const RenderToast = () => {
  const {
    handleFormSubmit,
    show,
    feedbacktype,
    finalFeedbackTypeArray,
    handleClick,
    handleFeedbackClick
  } = useContext(FeedbackWidgetContextData);

  const [selectedNPS, setSelectedNPS] = useState();

  const renderNPSBody = useCallback(
    () => (
      <div className="flex items-center justify-center">
        {npsConstants.map((item, index) => (
          <Button
            key={item.id}
            colors={selectedNPS === item.id ? 'brand' : 'white'}
            iconOnly
            onClick={() => {
              setSelectedNPS(item.id);
              handleClick();
            }}
            size="large"
            wrapperClassName={twClassNames(
              'w-[42.5px] rounded-none border-r-0 flex items-center justify-center foucs:ring-0',
              {
                'rounded-l-md': index === 0,
                'rounded-r-md border-r-1 border-base-300': index === 9
              }
            )}
          >
            {item.name}
          </Button>
        ))}
      </div>
    ),
    [handleClick, selectedNPS]
  );

  const renderEmojiThumb = useCallback(
    () => (
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
    ),
    [finalFeedbackTypeArray, handleClick, handleFeedbackClick]
  );

  const showNotification = useCallback(() => {
    notify(
      <Notifications
        size="md"
        {...(feedbacktype.type !== FEEDBACK_TYPE[4] && {
          title: feedbacktype.title,
          description: feedbacktype.description
        })}
        body={
          <div className="w-full">
            {/* render thumb or emoji view */}
            {[FEEDBACK_TYPE[0], FEEDBACK_TYPE[2]].includes(feedbacktype.type) &&
              renderEmojiThumb()}

            {/* render nps(number) view */}
            {feedbacktype.type === FEEDBACK_TYPE[3] && renderNPSBody()}

            {/* render form view */}
            {feedbacktype.type === FEEDBACK_TYPE[1] && <FormBuilder />}

            {/* render success view */}
            {feedbacktype.type === FEEDBACK_TYPE[4] && <FeedbackSuccess />}
          </div>
        }
        {...(feedbacktype.type === FEEDBACK_TYPE[1] && {
          footer: (
            <div>
              <Button type="submit" onClick={handleFormSubmit}>
                Submit Feedback
              </Button>
            </div>
          )
        })}
      />,
      {
        position: 'bottom-right',
        autoClose: false,
        id: 'feedback-widget',
        size: 'md'
      }
    );
  }, [
    feedbacktype.description,
    feedbacktype.title,
    feedbacktype.type,
    handleFormSubmit,
    renderEmojiThumb,
    renderNPSBody
  ]);

  useEffect(() => {
    if (show) showNotification();
  }, [show, feedbacktype.type, showNotification]);

  return <NotificationsContainer />;
};

export default RenderToast;
