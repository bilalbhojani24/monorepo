import FeedbackWidget from './index';

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

export const ModalFeedback = {
  args: {
    formFields: fields,
    handleFeedbackClick: (i) => console.log(i),
    flow: [
      {
        type: 'nps',
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
        title: 'How was your experience with Lorem ?',
        description: 'Success Optional description text for added context'
      }
    ],
    variationsProps: {
      modalHeader: {
        // handleDismissClick: () => setShow(false)
      }
    },
    isOpen: false,
    variation: 'modal'
  }
};

export const ToastFeedback = {
  args: {
    title: 'How was your experience with Lorem Ipsum?',
    description: 'Optional description text for added context',
    formFields: fields,
    handleFeedbackClick: (i) => console.log(i),
    flow: [
      {
        type: 'nps',
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
        title: 'How was your experience with Lorem ?',
        description: 'Success Optional description text for added context'
      }
    ],
    variationsProps: {
      modalHeader: {
        // handleDismissClick: () => setShow(false)
      }
    },
    isOpen: false,
    variation: 'toast',
    label: 'Button'
  }
};
