import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';

import { CHECK_POSITION, SELECT_OPTIONS } from './const/selectMenuConstants';
import SelectMenu from './index';

const defaultConfig = {
  title: 'Application/Components/SelectMenu',
  component: SelectMenu,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={"import SelectMenu from 'bifrost/SelectMenu'"}
        />
      ),
    },
  },
  argTypes: {
    checkPosition: {
      options: CHECK_POSITION,
      control: { type: 'inline-radio' },
      description: 'Position of check icon',
      defaultValue: CHECK_POSITION[0],
    },
    defaultValue: {
      option: { type: null },
      description:
        'Default selected values for the combobox, and the value state will be controlled internally, means values doesnt get updated on re-render',
      defaultValue: null,
    },
    isMultiSelect: {
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
      defaultValue: (selectedOptions) => {
        console.log(selectedOptions);
      },
    },
    options: {
      options: SELECT_OPTIONS,
      description: 'options for the combobox, array of objects',
      defaultValue: SELECT_OPTIONS,
    },
    value: {
      option: { type: null },
      description:
        'Default selected values for the combobox, and the value state will be controlled externally',
      defaultValue: SELECT_OPTIONS[0],
    },
  },
  controls: {},
};
const Template = (args) => <SelectMenu {...args} />;
const MultiSelectTemplate = (args) => <SelectMenu {...args} />;
const Primary = Template.bind({});
const MultiSelect = MultiSelectTemplate.bind({});
Primary.parameters = {
  controls: {},
};

export default defaultConfig;
export { MultiSelect, Primary };

MultiSelect.args = {
  defaultValue: null,
  isMultiSelect: true,
  value: [SELECT_OPTIONS[0], SELECT_OPTIONS[1]],
};
