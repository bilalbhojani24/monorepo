import React, { useState } from 'react';
import { delay } from '@browserstack/utils';
import { expect } from '@storybook/jest';
import { userEvent, within } from '@storybook/testing-library';

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

const selectMenuOptions = [
  'Wade Cooper',
  'Arlene Mccoy',
  'Devon Webb',
  'Tom Cook',
  'Tanya Fox'
];
const assignedTo = 'Assigned to';
const selectMenuOptionsSelector = '[role="option"]';

const Primary = Template.bind({});
Primary.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await expect(canvas.getByText(assignedTo)).toBeVisible();
  await expect(canvas.getByText(selectMenuOptions[0])).toBeVisible();
  await userEvent.click(canvas.getByText(selectMenuOptions[0]));
  await delay(1);
  const selectItems = document.querySelectorAll(selectMenuOptionsSelector);
  selectItems.forEach(async (item) => {
    expect(selectMenuOptions.includes(item.firstChild.textContent)).toBe(true);
  });
  selectItems[1].click();
  await delay(1);
  await expect(canvas.getByText(selectMenuOptions[1])).toBeVisible();
  await expect(canvas.getByText(assignedTo)).toBeVisible();
};

const MultiSelect = MultiSelectTemplate.bind({});
MultiSelect.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await expect(canvas.getByText(assignedTo)).toBeVisible();
  await expect(canvas.getByText(`${selectMenuOptions[0]} ,`)).toBeVisible();
  await expect(canvas.getByText(selectMenuOptions[1])).toBeVisible();
  await userEvent.click(canvas.getByText(`${selectMenuOptions[0]} ,`));
  await delay(1);
  const selectItems = document.querySelectorAll(selectMenuOptionsSelector);
  selectItems.forEach(async (item) => {
    if (Array.prototype.indexOf.call(selectItems, item) > 1) {
      await delay(1);
      item.click();
    }
  });
  await userEvent.click(canvas.getByText(`${selectMenuOptions[0]} ,`));
  selectMenuOptions.forEach(async (item) => {
    if (selectMenuOptions.indexOf(item) !== selectMenuOptions.length - 1) {
      await delay(1);
      await expect(canvas.getByText(`${item} ,`)).toBeVisible();
    } else {
      await delay(1);
      await expect(canvas.getByText(item)).toBeVisible();
    }
  });
  await expect(canvas.getByText(assignedTo)).toBeVisible();
};

const SelectWithPlaceholder = SelectWithPlaceholderTemplate.bind({});
SelectWithPlaceholder.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const placeholder = 'Select..';
  await expect(canvas.getByText(assignedTo)).toBeVisible();
  await expect(canvas.getByText(placeholder)).toBeVisible();
  await userEvent.click(canvas.getByText(placeholder));
  await delay(1);
  const selectItems = document.querySelectorAll(selectMenuOptionsSelector);
  selectItems.forEach(async (item) => {
    expect(selectMenuOptions.includes(item.firstChild.textContent)).toBe(true);
  });
  selectItems[1].click();
  await delay(1);
  await expect(canvas.getByText(selectMenuOptions[1])).toBeVisible();
  await expect(canvas.getByText(assignedTo)).toBeVisible();
};

const DisabledSelectMenu = Template.bind({});
DisabledSelectMenu.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await expect(canvas.getByText(assignedTo)).toBeVisible();
  await expect(canvas.getByText(selectMenuOptions[0])).toBeVisible();
  await userEvent.click(canvas.getByText(selectMenuOptions[0]));
  await delay(1);
  const selectItems = document.querySelectorAll(selectMenuOptionsSelector);
  await delay(1);
  expect(selectItems.length).toBe(0);
  await delay(1);
  await expect(canvas.getByText(assignedTo)).toBeVisible();
};

Primary.parameters = {
  controls: {}
};

export const ControlledSelectMenu = () => {
  const [selected, setSelected] = useState(null);
  return (
    <SelectMenu onChange={(val) => setSelected(val)} value={selected}>
      <SelectMenuLabel>Assigned to</SelectMenuLabel>
      <SelectMenuTrigger placeholder="Select.." />
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
export { DisabledSelectMenu, MultiSelect, Primary, SelectWithPlaceholder };

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

DisabledSelectMenu.args = {
  disabled: true
};
