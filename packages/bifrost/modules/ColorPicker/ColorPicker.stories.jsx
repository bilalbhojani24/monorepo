import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';

import ColorPicker from './index';

const defaultConfig = {
  title: 'Application/Components/ColorPicker',
  component: ColorPicker,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={"import ColorPicker from 'bifrost/ColorPicker'"}
        />
      )
    }
  },
  argTypes: {
    options: {
      controls: { type: null },
      defaultValue: [
        {
          name: 'Pink',
          bgColor: 'bg-pink-500',
          selectedColor: 'ring-pink-500'
        },
        {
          name: 'Purple',
          bgColor: 'bg-purple-500',
          selectedColor: 'ring-purple-500'
        },
        {
          name: 'Blue',
          bgColor: 'bg-brand-500',
          selectedColor: 'ring-brand-500'
        },
        {
          name: 'Green',
          bgColor: 'bg-success-500',
          selectedColor: 'ring-success-500'
        },
        {
          name: 'Yellow',
          bgColor: 'bg-attention-500',
          selectedColor: 'ring-attention-500'
        }
      ]
    }
  },
  controls: {}
};
const Template = (args) => <ColorPicker {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };
