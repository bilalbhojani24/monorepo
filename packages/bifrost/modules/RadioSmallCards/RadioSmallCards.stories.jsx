import React, { useState } from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';

import RadioSmallCards from './index';

const options = [
  { id: '1', name: '4 gb', disabled: false },
  { id: '2', name: '8 gb', disabled: false },
  { id: '3', name: '16 gb', disabled: false },
  { id: '4', name: '32 gb', disabled: false },
  { id: '5', name: '64 gb', disabled: false },
  { id: '6', name: '128 gb', disabled: true }
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
    defaultValue: {
      defaultValue: options[4]
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
  const [selectedValue, setSelectedValue] = useState(options[1]);

  return (
    <RadioSmallCards
      value={selectedValue}
      onChange={(e) => setSelectedValue(e)}
      columnWrapperClassName="sm:grid-cols-5"
      options={options}
    />
  );
};

export default defaultConfig;
export { Primary };
