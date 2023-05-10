import React, { useContext } from 'react';

import { FeedbackWidgetContextData } from '../context/feedbackWidgetContext';

const FeedbackSuccess = () => {
  const { feedbacktype } = useContext(FeedbackWidgetContextData);
  return (
    <div className="flex flex-col items-center">
      {feedbacktype.icon}
      <p className="text-lg font-medium leading-6">{feedbacktype.title}</p>
      <p className="text-base-500 text-sm font-normal leading-5">
        {feedbacktype.description}
      </p>
    </div>
  );
};

export default FeedbackSuccess;
