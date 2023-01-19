import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';

import Radio from './index';

const defaultConfig = {
  title: 'Application/Components/RadioButton',
  component: Radio,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={"import Radio from 'bifrost/Radio'"}
        />
      ),
    },
  },
  argTypes: {
    id: {
      option: { type: 'string' },
      defaultValue: 'radio-id',
    },
    checked: {
      option: { type: 'boolean' },
      defaultValue: undefined,
    },
    defaultChecked: {
      option: { type: 'boolean' },
      defaultValue: false,
    },
    description: {
      option: { type: 'string' },
      defaultValue: 'It is the description',
    },
    disabled: {
      option: { type: 'boolean' },
      defaultValue: false,
    },
    name: {
      option: { type: 'string' },
      defaultValue: 'Name',
    },
    onChange: {
      control: { type: 'text' },
      defaultValue: (e) => console.log(e.target.value),
    },
  },
  controls: {},
};
const Template = (args) => <Radio {...args} />;
const ControlledRadioTemplate = (args) => <Radio {...args} />;

const Primary = Template.bind({});
const ControlledRadio = ControlledRadioTemplate.bind({});

Primary.parameters = {
  controls: {},
};

export default defaultConfig;
export { ControlledRadio, Primary };

ControlledRadio.args = {
  checked: false,
  defaultChecked: undefined,
};
