import React, { useContext } from 'react';
import { Button } from '@browserstack/bifrost';

import { FeedbackWidgetContextData } from '../context/feedbackWidgetContext';

const RenderEmojiThumb = () => {
  const { finalFeedbackTypeArray, handleFeedbackClick, handleClick } =
    useContext(FeedbackWidgetContextData);

  return (
    <div className="flex justify-center space-x-6">
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
};

export default RenderEmojiThumb;
