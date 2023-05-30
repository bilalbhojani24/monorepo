import React, { useContext, useState } from 'react';
import { Button } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';

import { thumbsConstants } from '../const/feedbackWidgetConst';
import { FeedbackWidgetContextData } from '../context/feedbackWidgetContext';

const RenderEmojiThumb = () => {
  const [active, setActive] = useState('');
  const { handleFeedbackClick, handleClick } = useContext(
    FeedbackWidgetContextData
  );

  return (
    <div className="flex justify-center space-x-6">
      {thumbsConstants.map((item) => (
        <Button
          key={item.id}
          variant="rounded"
          colors="white"
          isIconOnlyButton
          onClick={() => {
            setActive(item.id);
            handleClick();
            handleFeedbackClick?.(item);
          }}
          wrapperClassName={twClassNames('w-[60px] h-[60px]', {
            'focus:ring-success-600': active === 'thup-1',
            'focus:ring-danger-600': active === 'thdn-2'
          })}
        >
          {item.icon}
        </Button>
      ))}
    </div>
  );
};

export default RenderEmojiThumb;
