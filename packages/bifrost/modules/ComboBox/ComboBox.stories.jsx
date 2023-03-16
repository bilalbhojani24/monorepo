import React, { useState } from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import ComboboxLabel from '../ComboboxLabel';
import ComboboxOptionGroup from '../ComboboxOptionGroup';
import ComboboxOptionItem from '../ComboboxOptionItem';
import ComboboxTrigger from '../ComboboxTrigger';

import { COMBOBOX_OPTIONS } from './const/comboBoxConstants';
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
    children: {
      option: { type: 'string' },
      defaultValue: (
        <>
          <ComboboxLabel>Assigned to</ComboboxLabel>
          <ComboboxTrigger placeholder="Placeholder" />
          <ComboboxOptionGroup>
            {COMBOBOX_OPTIONS.map((item) => (
              <ComboboxOptionItem key={item.value} option={item} />
            ))}
          </ComboboxOptionGroup>
        </>
      )
    },
    defaultValue: {
      option: { type: null },
      description:
        'Default selected values for the combobox, and the value state will be controlled internally, means values doesnt get updated on re-render',
      defaultValue: COMBOBOX_OPTIONS[0]
    },
    errorText: {
      option: { type: 'string' },
      defaultValue: ''
    },
    isMulti: {
      option: { type: 'boolean' },
      description: 'Multiple select enable or not',
      defaultValue: false
    },
    disabled: {
      option: { type: 'boolean' },
      description: 'Disable button or not',
      defaultValue: false
    },
    onChange: {
      option: { type: null },
      description: 'Callback function when combobox value is changed',
      defaultValue: () => {}
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
    <ComboBox onChange={(val) => setSelected(val)} value={selected} isMulti>
      <ComboboxLabel>Assigned to</ComboboxLabel>
      <ComboboxTrigger placeholder="Placeholder" />
      <ComboboxOptionGroup>
        {COMBOBOX_OPTIONS.map((item) => (
          <ComboboxOptionItem key={item.value} option={item} />
        ))}
      </ComboboxOptionGroup>
    </ComboBox>
  );
};

export const LoadingCombobox = () => {
  const [loading, setLoading] = useState('');

  return (
    <>
      <ComboBox isLoading={loading}>
        <ComboboxLabel>Assigned to</ComboboxLabel>
        <ComboboxTrigger placeholder="Placeholder" />
        <ComboboxOptionGroup>
          {COMBOBOX_OPTIONS.map((item) => (
            <ComboboxOptionItem key={item.value} option={item} />
          ))}
        </ComboboxOptionGroup>
      </ComboBox>

      <button type="button" onClick={() => setLoading('Loading...')}>
        Enable Loader
      </button>
      <button type="button" onClick={() => setLoading(undefined)}>
        Disable Loader
      </button>
    </>
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
