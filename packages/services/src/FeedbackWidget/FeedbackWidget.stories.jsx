import React, { useState } from 'react';
import {
  Hyperlink as Link,
  SelectMenu,
  SelectMenuLabel,
  SelectMenuOptionGroup,
  SelectMenuOptionItem,
  SelectMenuTrigger
} from '@browserstack/bifrost';

import DocPageTemplate from '../../.storybook/DocPageTemplate';

import FeedbackSuccess from './components/FeedbackSuccess';
import { feedbackType } from './const/feedbackWidgetConst';
import FeedbackWidget from './index';

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
      options: feedbackType,
      defaultValue: feedbackType[0]
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
export { Primary };

export const FeedbackSuccessComponent = () => (
  <FeedbackSuccess
    icon=""
    title="Thank you for your feedback!"
    description={
      <>
        <div className="flex flex-col space-y-2">
          <p>This will help us to improve your experience</p>
          <p className="flex items-center space-x-1">
            <span>If you have any queries please</span>
            <Link
              href="https://www.browserstack.com/contact"
              wrapperClassName="text-base-500 underline"
            >
              contact us
            </Link>
          </p>
        </div>
      </>
    }
  />
);

export const ModalFeedbackWidget = () => {
  const [show, setShow] = useState(false);
  const [currentType, setCurrentType] = useState(feedbackType[0]);

  return (
    <>
      <SelectMenu
        onChange={(val) => {
          setCurrentType(val);
          setShow(true);
        }}
        value={currentType}
      >
        <SelectMenuLabel>Select the type of feedback widget</SelectMenuLabel>
        <SelectMenuTrigger placeholder="Select.." />
        <SelectMenuOptionGroup>
          {feedbackType.map((s) => (
            <SelectMenuOptionItem
              key={s}
              option={{
                label: s,
                value: s
              }}
            />
          ))}
        </SelectMenuOptionGroup>
      </SelectMenu>
      <SelectMenu>
        <SelectMenuOptionGroup>
          {feedbackType.map((s) => (
            <SelectMenuOptionItem
              option={{
                label: s,
                value: s
              }}
            />
          ))}
        </SelectMenuOptionGroup>
      </SelectMenu>

      <FeedbackWidget
        title="How was your experience with Lorem Ipsum?"
        description="Optional description text for added context"
        formFields={fields}
        handleFeedbackClick={(i) => console.log(i)}
        type={currentType.value}
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
