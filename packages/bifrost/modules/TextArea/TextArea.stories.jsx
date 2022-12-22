import React from 'react';
import TextArea from './index';
import DocPageTemplate from '../../.storybook/DocPageTemplate';

const defaultConfig = {
  title: 'Application/Components/TextArea',
  component: TextArea,
  parameters: {
    docs: {
      page: () => {
        return <DocPageTemplate importStatement={"import TextArea from 'bifrost/TextArea'"} />;
      }
    }
  },
  argTypes: {
    label: {
      control: { type: 'text' }
    },
    disabled: {
      control: { type: 'boolean' }
    }
  },
  controls: {}
};
const Template = (args) => <TextArea {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };
