import React, { useState } from 'react';
import { Button } from '@browserstack/bifrost';

import DocPageTemplate from '../../.storybook/DocPageTemplate';

import { FEEDBACK_TYPE } from './const/feedbackWidgetConst';
import FeedbackWidget from './index';

const successIcon = (
  <svg
    width="49"
    height="49"
    viewBox="0 0 49 49"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="0.5" y="0.5" width="48" height="48" rx="24" fill="#D1FAE5" />
    <path
      d="M17.5 25.5L21.5 29.5L31.5 19.5"
      stroke="#059669"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const fields = [
  {
    id: 'comment',
    label: 'Other comments',
    fileType: 'textarea',
    placeholder: 'Please elaborate here',
    isMandatory: true,
    isResizable: true
  },
  {
    id: 'email',
    label: 'Business email',
    fileType: 'input',
    placeholder: 'you@example.com',
    wrapperClassName: '',
    isMandatory: true,
    errorMessage: 'Invalid email address',
    regex: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  }
];

const defaultConfig = {
  title: 'Application/Components/FeedbackWidget',
  component: FeedbackWidget,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={
            "import FeedbackWidget from 'services/FeedbackWidget'"
          }
        />
      )
    }
  },
  argTypes: {
    description: {
      option: { type: 'string' },
      defaultValue: 'Optional description text for added context'
    },
    formFields: {
      option: { type: 'object' },
      defaultValue: fields
    },
    title: {
      option: { type: 'string' },
      defaultValue: 'How was your experience with Lorem Ipsum?'
    },
    type: {
      options: FEEDBACK_TYPE,
      defaultValue: FEEDBACK_TYPE[0]
    }
  },
  controls: {}
};
const Template = (args) => <FeedbackWidget {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;

export const ModalFeedbackWidget = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <Button
        onClick={() => {
          setShow(true);
        }}
      >
        Click to open feedback widget
      </Button>

      <FeedbackWidget
        title="How was your experience with Lorem Ipsum?"
        description="Optional description text for added context"
        formFields={fields}
        flow={[
          {
            type: 'nps',
            title: 'How was your experience with Lorem Ipsum?',
            description: 'Emoji Optional description text for added context '
          },
          {
            type: 'form',
            title: 'How was your experience with Lorem Ipsum 1?',
            description: 'Form Optional description text for added context 1'
          },
          {
            type: 'success',
            title: 'How was your experience with Lorem Ipsum 2?',
            description: 'Success Optional description text for added context',
            icon: successIcon
          }
        ]}
        handleFeedbackClick={(i) => console.log(i)}
        variationsProps={{
          modal: {
            show
          },
          modalHeader: {
            handleDismissClick: () => setShow(false)
          }
        }}
      />
    </>
  );
};
