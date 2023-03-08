import React from 'react';
import { UsersIcon } from '@heroicons/react/20/solid';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import Button from '../Button';
import SelectMenu from '../SelectMenu';
import SelectMenuOptionGroup from '../SelectMenuOptionGroup';
import SelectMenuOptionItem from '../SelectMenuOptionItem';
import SelectMenuTrigger from '../SelectMenuTrigger';

import InputField from './index';

const defaultConfig = {
  title: 'Application/Components/InputFieldCopy',
  component: InputField,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={"import InputField from 'bifrost/InputField'"}
        />
      )
    }
  },
  argTypes: {
    label: {
      type: { summary: 'STRING', required: false },
      description: 'Content that goes inside the banner',
      control: { type: 'text' },
      defaultValue: 'Label'
    },
    autoComplete: {
      type: { summary: 'STRING', required: false },
      description: 'ABCDEFGHIJK',
      control: { type: 'text' },
      defaultValue: 'off'
    },
    cornerHintText: {
      type: { summary: 'STRING', required: false },
      description: 'ABCDEFGHIJK',
      control: { type: 'text' },
      defaultValue: ''
    },
    defaultValue: {
      type: { summary: 'STRING', required: false },
      description: 'ABCDEFGHIJK',
      control: { type: 'text' },
      defaultValue: undefined
    },
    value: {
      type: { summary: 'STRING', required: false },
      description: 'ABCDEFGHIJK',
      control: { type: 'text' },
      defaultValue: undefined
    },
    description: {
      type: { summary: 'STRING', required: false },
      description: 'ABCDEFGHIJK',
      control: { type: 'text' },
      defaultValue: ''
    },
    errorText: {
      type: { summary: 'STRING', required: false },
      description: 'ABCDEFGHIJK',
      control: { type: 'text' },
      defaultValue: ''
    },
    id: {
      type: { summary: 'STRING', required: true },
      description: 'ABCDEFGHIJK',
      control: { type: 'text' },
      defaultValue: 'test-id'
    },
    inputRef: {
      type: { summary: 'OBJECT', required: false },
      description: 'ABCDEFGHIJK',
      control: { type: null }
    },
    leadingIcon: {
      type: { summary: 'NODE', required: false },
      description: 'ABCDEFGHIJK',
      control: { type: null },
      defaultValue: <UsersIcon className="text-base-400 h-5 w-5" />
    },
    trailingIcon: {
      type: { summary: 'NODE', required: false },
      description: 'ABCDEFGHIJK',
      //   control: { type: null },
      defaultValue: <UsersIcon className="text-base-400 h-5 w-5" />
    },
    addOnBefore: {
      type: { summary: 'NODE', required: false },
      description: 'ABCDEFGHIJK',
      control: { type: null },
      defaultValue: null
    },
    addOnAfter: {
      type: { summary: 'NODE', required: false },
      description: 'ABCDEFGHIJK',
      //   control: { type: null },
      defaultValue: null
    },
    placeholder: {
      type: { summary: 'STRING', required: false },
      description: 'ABCDEFGHIJK',
      control: { type: 'text' },
      defaultValue: 'Placeholder text'
    },
    readonly: {
      type: { summary: 'STRING', required: false },
      description: 'ABCDEFGHIJK',
      control: { type: 'boolean' },
      defaultValue: false
    },
    type: {
      type: { summary: 'STRING', required: false },
      description: 'ABCDEFGHIJK',
      control: { type: 'text' },
      defaultValue: 'text'
    }
  },
  controls: {}
};
const Template = (args) => <InputField {...args} />;
const InputWithButtonTemplate = (args) => <InputField {...args} />;
const InputWithTextTemplate = (args) => <InputField {...args} />;
const InputWithDropdownTemplate = (args) => <InputField {...args} />;

const Primary = Template.bind({});
const InputWithButton = InputWithButtonTemplate.bind({});
const InputWithText = InputWithTextTemplate.bind({});
const InputWithDropdown = InputWithDropdownTemplate.bind({});

Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { InputWithButton, InputWithDropdown, InputWithText, Primary };

InputWithButton.args = {
  addOnBefore: <Button wrapperClassName="rounded-r-none">Before</Button>,
  addOnAfter: <Button wrapperClassName="rounded-l-none">After</Button>
};

InputWithText.args = {
  addOnBefore: (
    <p className="bg-base-200 flex items-center rounded-md rounded-r-none px-3">
      Before
    </p>
  ),
  addOnAfter: (
    <p className="bg-base-200 flex items-center rounded-md rounded-l-none px-3">
      After
    </p>
  )
};

const options = [
  {
    label: 'Wade Cooper',
    value: 1
  },
  {
    value: 2,
    label: 'Arlene Mccoy'
  },
  {
    value: 3,
    label: 'Devon Webb'
  },
  {
    value: 4,
    label: 'Tom Cook'
  },
  {
    value: 5,
    label: 'Tanya Fox'
  }
];
InputWithDropdown.args = {
  wrapperClassName: '',
  addOnBefore: (
    <SelectMenu>
      <SelectMenuTrigger
        placeholder="Select.."
        wrapperClassName="rounded-r-none  w-max"
      />
      <SelectMenuOptionGroup>
        {options.map((item) => (
          <SelectMenuOptionItem key={item.value} option={item} />
        ))}
      </SelectMenuOptionGroup>
    </SelectMenu>
  ),
  addOnAfter: (
    <SelectMenu>
      <SelectMenuTrigger
        placeholder="Select.."
        wrapperClassName="rounded-l-none  w-max"
      />
      <SelectMenuOptionGroup>
        {options.map((item) => (
          <SelectMenuOptionItem key={item.value} option={item} />
        ))}
      </SelectMenuOptionGroup>
    </SelectMenu>
  )
};
