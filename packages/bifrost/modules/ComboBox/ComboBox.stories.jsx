import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';

import { CHECK_POSITION, COMBOBOX_OPTIONS } from './const/comboBoxConstants';
import ComboBox from './index';

const defaultConfig = {
  title: 'Application/Components/ComboBox',
  component: ComboBox,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={"import ComboBox from 'bifrost/ComboBox'"}
        />
      ),
    },
  },
  argTypes: {
    checkPosition: {
      options: CHECK_POSITION,
      control: { type: 'inline-radio' },
      description: 'Position of check icon',
    },
    isMulti: {
      option: { type: 'boolean' },
      description: 'Multiple select enable or not',
      defaultValue: false,
    },
    label: {
      option: { type: 'string' },
      defaultValue: 'Assigned to',
      description: 'Description for combobox',
    },
    onChange: {
      option: { type: null },
      description: 'Callback function when combobox value is changed',
      defaultValue: () => {},
    },
    options: {
      description: 'options for the combobox, array of objects',
      defaultValue: COMBOBOX_OPTIONS,
    },
    defaultValue: {
      option: { type: null },
      description:
        'Default selected values for the combobox, and the value state will be controlled internally, means values doesnt get updated on re-render',
      defaultValue: null,
    },
    value: {
      option: { type: null },
      description:
        'Default selected values for the combobox, and the value state will be controlled externally',
      defaultValue: COMBOBOX_OPTIONS[0],
    },
  },
  controls: {},
};
const Template = (args) => <ComboBox {...args} />;
const MultiSelectTemplate = (args) => <ComboBox {...args} />;
const Primary = Template.bind({});
const MultiSelect = MultiSelectTemplate.bind({});

Primary.parameters = {
  controls: {},
};

export default defaultConfig;
export { MultiSelect, Primary };

MultiSelect.args = {
  defaultValue: null,
  isMulti: true,
  value: [COMBOBOX_OPTIONS[0], COMBOBOX_OPTIONS[1]],
};
