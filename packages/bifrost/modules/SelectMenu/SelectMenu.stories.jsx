import React, { useRef, useState } from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import SelectMenuLabel from '../SelectMenuLabel';
import SelectMenuOptionGroup from '../SelectMenuOptionGroup';
import SelectMenuOptionItem from '../SelectMenuOptionItem';
import SelectMenuTrigger from '../SelectMenuTrigger';

import { SELECT_OPTIONS } from './const/selectMenuConstants';
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
    children: {
      option: { type: null },
      defaultValue: (
        <>
          <SelectMenuLabel>Assigned to</SelectMenuLabel>
          <SelectMenuTrigger placeholder="Select.." />
          <SelectMenuOptionGroup>
            {SELECT_OPTIONS.map((item) => (
              <SelectMenuOptionItem key={item.value} option={item} />
            ))}
          </SelectMenuOptionGroup>
        </>
      )
    },
    defaultValue: {
      option: { type: null },
      description:
        'Default selected values for the selectMenu, and the value state will be controlled internally, means values doesnt get updated on re-render',
      defaultValue: SELECT_OPTIONS[0]
    },
    errorText: {
      controls: { type: 'string' },
      defaultValue: ''
    },
    isMulti: {
      option: { type: 'boolean' },
      description: 'Multiple select enable or not',
      defaultValue: false
    },
    onChange: {
      option: { type: null },
      description: 'Callback function when selectMenu value is changed',
      defaultValue: (selectedOptions) => {
        console.log(selectedOptions);
      }
    },
    value: {
      option: { type: null },
      description:
        'Default selected values for the selectMenu, and the value state will be controlled externally',
      defaultValue: undefined
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
  const [selected, setSelected] = useState(null);
  const ref = useRef();
  return (
    <SelectMenu onChange={(val) => setSelected(val)} value={selected}>
      <SelectMenuLabel>Assigned to</SelectMenuLabel>
      <SelectMenuTrigger placeholder="Select.." ref={ref} />
      <SelectMenuOptionGroup>
        {SELECT_OPTIONS.map((item) => (
          <SelectMenuOptionItem key={item.value} option={item} />
        ))}
      </SelectMenuOptionGroup>
    </SelectMenu>
  );
};

export const CustomSelectMenu = () => {
  const options = [
    {
      label: (
        <div className="flex items-center space-x-2">
          <div className="bg-danger-500 h-2 w-2 rounded-full" />
          <span>Wade copper</span>
        </div>
      ),
      value: 1
    },
    {
      label: (
        <div className="flex items-center space-x-2">
          <div className="bg-success-500 h-2 w-2 rounded-full" />
          <span>Devon webb</span>
        </div>
      ),
      value: 2
    }
  ];
  return (
    <SelectMenu isMulti>
      <SelectMenuLabel>Assigned to</SelectMenuLabel>
      <SelectMenuTrigger placeholder="Select.." />
      <SelectMenuOptionGroup>
        {options.map((item) => (
          <SelectMenuOptionItem key={item.value} option={item} />
        ))}
      </SelectMenuOptionGroup>
    </SelectMenu>
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
