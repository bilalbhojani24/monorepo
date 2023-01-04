import React from 'react';
import SelectMenu from './index';
import DocPageTemplate from '../../.storybook/DocPageTemplate';
import { CHECK_POSITION, SELECT_OPTIONS } from './const/selectMenuConstants';

const defaultConfig = {
  title: 'Application/Components/SelectMenu',
  component: SelectMenu,
  parameters: {
    docs: {
      page: () => {
        return (
          <DocPageTemplate
            importStatement={"import SelectMenu from 'bifrost/SelectMenu'"}
          />
        );
      },
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
export { Primary, MultiSelect };

MultiSelect.args = {
  defaultValue: [SELECT_OPTIONS[0], SELECT_OPTIONS[1]],
  isMultiSelect: true,
  value: null,
};
