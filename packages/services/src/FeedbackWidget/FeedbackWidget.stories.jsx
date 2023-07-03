import React, { useEffect } from 'react';
import {
  Button,
  CheckCircleIcon,
  NotificationsContainer
} from '@browserstack/bifrost';

import FeedbackWidget, { showFeedbackWidget } from './index';

const fields = [
  {
    id: 'comment',
    label: 'Other comments',
    fieldType: 'textarea',
    placeholder: 'Please elaborate here',
    isMandatory: true,
    isResizable: true,
    errorMessage: 'Invalid comment'
  },
  {
    id: 'email',
    label: 'Business email',
    fieldType: 'input',
    placeholder: 'you@example.com',
    isMandatory: true,
    errorMessage: 'Invalid email address',
    regex: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  }
];

export default {
  title: 'Services/FeedbackWidget',
  component: FeedbackWidget,
  tags: ['autodocs'],
  argTypes: {}
};

export const ModalWidget = (args) => {
  useEffect(() => {
    showFeedbackWidget(() => console.log('opened'));
  }, []);

  return (
    <>
      <Button
        onClick={() => {
          showFeedbackWidget(() => console.log('opened'));
        }}
      >
        Show Modal Widget
      </Button>
      <FeedbackWidget {...args} />
      <NotificationsContainer />
    </>
  );
};

ModalWidget.args = {
  formFields: fields,
  handleFeedbackClick: (data) => console.log(data),
  flow: [
    {
      type: 'nps',
      title: 'How was your experience with Lorem Ipsum Modal?',
      description: 'Emoji Optional description text for added context Modal'
    },
    {
      type: 'form',
      title: 'How was your experience with Lorem Ipsum Modal form?',
      description: 'Form Optional description text for added context Modal form'
    },
    {
      type: 'success',
      title: 'How was your experience with Lorem ?',
      description: 'Success Optional description text for added context',
      icon: <CheckCircleIcon className="text-success-400 h-10 w-10" />
    }
  ],
  variation: 'modal',
  onFeedbackWidgetClose: (data) => {
    console.log(data);
  }
};

export const ToastWidget = (args) => {
  useEffect(() => {
    showFeedbackWidget(() => console.log('opened'));
  }, []);
  return (
    <>
      <Button
        onClick={() => {
          showFeedbackWidget();
        }}
      >
        Show Toast Widget
      </Button>
      <FeedbackWidget {...args} />
      <NotificationsContainer />
    </>
  );
};

ToastWidget.args = {
  formFields: fields,
  handleFeedbackClick: (data) => console.log(data),
  flow: [
    {
      type: 'thumbs',
      title: 'How was your experience with Lorem Ipsum Modal?',
      description: 'Emoji Optional description text for added context Modal'
    },
    {
      type: 'form',
      title: 'How was your experience with Lorem Ipsum Modal form?',
      description: 'Form Optional description text for added context Modal form'
    },
    {
      type: 'success',
      title: 'How was your experience with Lorem ?',
      description: 'Success Optional description text for added context',
      icon: <CheckCircleIcon className="text-success-400 h-6 w-6" />
    }
  ],
  variation: 'toast',
  onFeedbackWidgetClose: (data) => {
    console.log(data);
  }
};
