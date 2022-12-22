import React from 'react';
import Radio from './index';
import DocPageTemplate from '../../.storybook/DocPageTemplate';

const defaultConfig = {
  title: 'Application/Components/RadioButton',
  component: Radio,
  parameters: {
    docs: {
      page: () => {
        return <DocPageTemplate importStatement={"import Radio from 'bifrost/Radio'"} />;
      }
    }
  },
  argTypes: {
    id: {
      control: { type: 'text' },
      defaultValue: 'radio-id'
    },
    isChecked: {
      control: { type: 'boolean' }
    },
    description: {
      control: { type: 'text' },
      defaultValue: 'It is the description'
    },
    disabled: {
      control: { type: 'boolean' }
    },
    name: {
      control: { type: 'text' },
      defaultValue: 'Name'
    }
  },
  controls: {}
};
const Template = (args) => <Radio {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };
