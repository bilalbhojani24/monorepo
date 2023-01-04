import React from 'react';
import InputWButton from './index';
import { UsersIcon } from '@heroicons/react/20/solid';
import DocPageTemplate from '../../.storybook/DocPageTemplate';

const dropdownOptions = ['USD', 'CAD', 'EUR', 'INR'];
const defaultConfig = {
  title: 'Application/Components/InputWButton',
  component: InputWButton,
  parameters: {
    docs: {
      page: () => {
        return <DocPageTemplate importStatement={"import InputWButton from 'bifrost/InputWButton'"} />;
      }
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
      defaultValue: ''
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
    addOnText: {
      type: { summary: 'STRING', required: false },
      description: 'ABCDEFGHIJK',
      control: { type: 'text' },
      defaultValue: 'Add On'
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
    isAddOnInline: {
      control: { type: 'boolean' },
      description: 'Lorem Ipsum',
      type: { summary: 'BOOLEAN', required: false },
      defaultValue: true
    },
    placeholder: {
      type: { summary: 'STRING', required: false },
      description: 'ABCDEFGHIJK',
      control: { type: 'text' },
      defaultValue: 'Placeholder text'
    },
    buttonElement: {
      type: { summary: 'STRING', required: false },
      description: 'ABCDEFGHIJK',
      control: { type: 'text' },
      defaultValue: 'Button'
    },
    type: {
      type: { summary: 'STRING', required: false },
      description: 'ABCDEFGHIJK',
      control: { type: 'text' },
      defaultValue: 'text'
    },
    dropdownList: {
      type: { summary: 'STRING', required: false },
      description: 'ABCDEFGHIJK',
      // control: { type: 'text' },
      defaultValue: dropdownOptions
    },
    icon: {
      type: { summary: 'NODE', required: false },
      description: 'ABCDEFGHIJK',
      control: { type: null },
      defaultValue: <UsersIcon className="h-5 w-5 text-gray-400" />
    }
  },
  controls: {}
};
const Template = (args) => <InputWButton {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };
