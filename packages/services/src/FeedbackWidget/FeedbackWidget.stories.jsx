import React, { useState } from 'react';
import { Button, CheckCircleIcon } from '@browserstack/bifrost';

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
    fieldType: 'textarea',
    placeholder: 'Please elaborate here',
    isMandatory: true,
    isResizable: true
  },
  {
    id: 'email',
    label: 'Business email',
    fieldType: 'input',
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
    flow: {
      option: { type: 'object' },
      defaultValue: [
        {
          type: 'thumbs',
          title: 'How was your experience with Lorem Ipsum Modal?',
          description: 'Emoji Optional description text for added context Modal'
        },
        {
          type: 'form',
          title: 'How was your experience with Lorem Ipsum Modal form?',
          description:
            'Form Optional description text for added context Modal form'
        },
        {
          type: 'success',
          title: 'How was your experience with Lorem Ipsum modal success?',
          description:
            'Success Optional description text for added context modal success',
          icon: <CheckCircleIcon className="text-success-400 h-6 w-6" />
        }
      ]
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
        handleFeedbackClick={(i) => console.log(i)}
        flow={[
          {
            type: 'thumbs',
            title: 'How was your experience with Lorem Ipsum Modal?',
            description:
              'Emoji Optional description text for added context Modal'
          },
          {
            type: 'form',
            title: 'How was your experience with Lorem Ipsum Modal form?',
            description:
              'Form Optional description text for added context Modal form'
          },
          {
            type: 'success',
            title: 'How was your experience with Lorem ?',
            description: 'Success Optional description text for added context',
            icon: successIcon
          }
        ]}
        variationsProps={{
          modalHeader: {
            handleDismissClick: () => setShow(false)
          }
        }}
        isOpen={show}
        variation="modal"
      />
    </>
  );
};

export const ToastFeedbackWidget = () => {
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
        formFields={[
          {
            id: 'toast-comment',
            label: 'Other comments',
            fieldType: 'textarea',
            placeholder: 'Please elaborate here',
            isMandatory: true,
            isResizable: true
          },
          {
            id: 'toast-email',
            label: 'Business email',
            fieldType: 'input',
            placeholder: 'you@example.com',
            wrapperClassName: '',
            isMandatory: false,
            errorMessage: 'Invalid email address',
            regex: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
          }
        ]}
        flow={[
          {
            type: 'thumbs',
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
            icon: <CheckCircleIcon className="text-success-400 h-6 w-6" />
          }
        ]}
        handleFeedbackClick={(i) => console.log(i)}
        isOpen={show}
        variation="toast"
        variationsProps={{
          notifications: {
            handleClose: () => {
              setShow(false);
            }
          }
        }}
      />
    </>
  );
};
