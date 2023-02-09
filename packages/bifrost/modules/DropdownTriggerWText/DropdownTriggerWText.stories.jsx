import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';

import DropdownTriggerWText from './index';

const defaultConfig = {
  title: 'Application/Components/DropdownTriggerWText',
  component: DropdownTriggerWText,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={
            "import DropdownTriggerWText from 'bifrost/DropdownTriggerWText'"
          }
        />
      )
    }
  },
  argTypes: {
    wrapperClassName: {
      control: { type: 'text' },
      type: { summary: 'TEXT', required: false },
      description: 'Classes to be passed to base component'
    }
  },
  controls: {}
};
const Template = (args) => (
  <DropdownTriggerWText {...args}>Trigger</DropdownTriggerWText>
);
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };
