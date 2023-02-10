import React, { useState } from 'react';

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
      )
    }
  },
  argTypes: {
    checkPosition: {
      options: CHECK_POSITION,
      control: { type: 'inline-radio' },
      description: 'Position of check icon'
    },
    defaultValue: {
      option: { type: null },
      description:
        'Default selected values for the combobox, and the value state will be controlled internally, means values doesnt get updated on re-render',
      defaultValue: COMBOBOX_OPTIONS[0]
    },
    isMulti: {
      option: { type: 'boolean' },
      description: 'Multiple select enable or not',
      defaultValue: false
    },
    label: {
      option: { type: 'string' },
      defaultValue: 'Assigned to',
      description: 'Description for combobox'
    },
    onChange: {
      option: { type: null },
      description: 'Callback function when combobox value is changed',
      defaultValue: () => {}
    },
    options: {
      option: { type: null },
      description: 'options for the combobox, array of objects',
      defaultValue: COMBOBOX_OPTIONS
    },
    placeholder: {
      option: { type: 'string' },
      defaultValue: 'placeholder text...'
    },
    value: {
      option: { type: null },
      description:
        'Default selected values for the combobox, and the value state will be controlled externally',
      defaultValue: null
    }
  },
  controls: {}
};
const Template = (args) => <ComboBox {...args} />;
const MultiSelectTemplate = (args) => <ComboBox {...args} />;
const PlaceholderTemplate = (args) => <ComboBox {...args} />;

const Primary = Template.bind({});
const MultiSelect = MultiSelectTemplate.bind({});
const Placeholder = PlaceholderTemplate.bind({});

Primary.parameters = {
  controls: {}
};

export const ControlledCombobox = () => {
  const [selected, setSelected] = useState([]);
  return (
    <ComboBox
      options={COMBOBOX_OPTIONS}
      onChange={(val) => setSelected(val)}
      value={selected}
      isMulti
    />
  );
};

export default defaultConfig;
export { MultiSelect, Placeholder, Primary };

MultiSelect.args = {
  value: null,
  isMulti: true,
  defaultValue: [COMBOBOX_OPTIONS[0], COMBOBOX_OPTIONS[4]]
};

Placeholder.args = {
  value: null,
  defaultValue: null
};
