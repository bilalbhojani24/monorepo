import React, { useContext } from 'react';
import { Notifications } from '@browserstack/bifrost';

import { FeedbackWidgetContextData } from '../context/feedbackWidgetContext';

const RenderToast = () => {
  const { title, description } = useContext(FeedbackWidgetContextData);
  return <Notifications title={title} description={description} />;
};

export default RenderToast;
