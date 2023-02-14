import React, { useState } from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import SelectMenuOption from '../SelectMenuOption';

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
      )
    }
  },
  argTypes: {
    checkPosition: {
      options: CHECK_POSITION,
      control: { type: 'inline-radio' },
      description: 'Position of check icon',
      defaultValue: CHECK_POSITION[0]
    },
    defaultValue: {
      option: { type: null },
      description:
        'Default selected values for the selectMenu, and the value state will be controlled internally, means values doesnt get updated on re-render',
      defaultValue: SELECT_OPTIONS[0]
    },
    isMulti: {
      option: { type: 'boolean' },
      description: 'Multiple select enable or not',
      defaultValue: false
    },
    label: {
      control: { type: 'text' },
      defaultValue: 'Assigned to',
      type: { summary: 'TEXT', required: false },
      description: 'Description for selectMenu'
    },
    onChange: {
      option: { type: null },
      description: 'Callback function when selectMenu value is changed',
      defaultValue: (selectedOptions) => {
        console.log(selectedOptions);
      }
    },
    renderOptions: {
      description: 'options for the selectMenu, array of objects',
      defaultValue: (
        <>
          {SELECT_OPTIONS.map((item) => (
            <SelectMenuOption option={item} />
          ))}
        </>
      )
    },
    placeholder: {
      option: { type: 'string' },
      description: 'Select menu...'
    },
    value: {
      option: { type: null },
      description:
        'Default selected values for the selectMenu, and the value state will be controlled externally',
      defaultValue: undefined
    },
    wrapperClassName: {
      control: { type: 'text' },
      type: { summary: 'TEXT', required: false },
      description: 'Classes to be passed to base SelectMenu component'
    }
  },
  controls: {}
};
const Template = (args) => <SelectMenu {...args} />;
const MultiSelectTemplate = (args) => <SelectMenu {...args} />;
const SelectWithPlaceholderTemplate = (args) => <SelectMenu {...args} />;

const Primary = Template.bind({});
const MultiSelect = MultiSelectTemplate.bind({});
const SelectWithPlaceholder = SelectWithPlaceholderTemplate.bind({});

Primary.parameters = {
  controls: {}
};

export const ControlledSelectMenu = () => {
  const [selected, setSelected] = useState([]);
  return (
    <SelectMenu
      onChange={(val) => setSelected(val)}
      value={selected}
      isMulti
      renderOptions={
        <>
          {SELECT_OPTIONS.map((item) => (
            <SelectMenuOption option={item} />
          ))}
        </>
      }
    />
  );
};

export default defaultConfig;
export { MultiSelect, Primary, SelectWithPlaceholder };

MultiSelect.args = {
  defaultValue: [SELECT_OPTIONS[0], SELECT_OPTIONS[1]],
  isMulti: true,
  value: undefined
};

SelectWithPlaceholder.args = {
  placeholder: 'Placeholder text...',
  value: null,
  defaultValue: null
};
