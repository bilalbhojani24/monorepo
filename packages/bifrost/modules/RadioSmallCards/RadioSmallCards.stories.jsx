import React, { useState } from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';

import RadioSmallCards from './index';

const options = [
  { name: '4 gb', disabled: false },
  { name: '8 gb', disabled: false },
  { name: '16 gb', disabled: false },
  { name: '32 gb', disabled: false },
  { name: '64 gb', disabled: false },
  { name: '128 gb', disabled: true }
];
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
      defaultValue: options
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
    },
    value: {
      defaultValue: options[2]
    }
  },
  controls: {}
};
const Template = (args) => <RadioSmallCards {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export const ControlledExample = () => {
  const [selectedValue, setSelectedValue] = useState(null);

  return (
    <RadioSmallCards
      value={selectedValue}
      onChange={(e) => setSelectedValue(e)}
      options={[
        { name: '4 gb', disabled: false },
        { name: '8 gb', disabled: false },
        { name: '16 gb', disabled: false },
        { name: '32 gb', disabled: false },
        { name: '64 gb', disabled: false }
      ]}
    />
  );
};

export default defaultConfig;
export { Primary };
