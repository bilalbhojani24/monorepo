import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';

import RadioSmallCards from './index';

const defaultConfig = {
  title: 'Application/Components/RadioSmallCards',
  component: RadioSmallCards,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={
            "import RadioSmallCards from 'bifrost/RadioSmallCards'"
          }
        />
      )
    }
  },
  argTypes: {
    options: {
      defaultValue: [
        { name: '4 gb', disabled: false },
        { name: '8 gb', disabled: false },
        { name: '16 gb', disabled: false },
        { name: '32 gb', disabled: false },
        { name: '64 gb', disabled: false },
        { name: '128 gb', disabled: true }
      ]
    },
    heading: {
      type: { summary: 'STRING', required: false },
      description: 'Add heading to the component',
      control: { type: 'text' },
      defaultValue: 'sample text'
    },
    label: {
      type: { summary: 'STRING', required: false },
      description: 'Provide a label to component',
      control: { type: 'text' },
      defaultValue: 'sample label'
    },
    wrapperClassName: {
      type: { summary: 'STRING', required: false },
      description: 'Provide additional styles to component',
      control: { type: 'text' },
      defaultValue: ''
    },
    cardWrapperClassName: {
      type: { summary: 'STRING', required: false },
      description:
        'Provide additional styles to inner card section of the component',
      control: { type: 'text' },
      defaultValue: ''
    }
  },
  controls: {}
};
const Template = (args) => <RadioSmallCards {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };
