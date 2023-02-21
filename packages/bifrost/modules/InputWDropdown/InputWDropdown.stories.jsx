import React from 'react';
import InputWDropdown from './index';
import DocPageTemplate from '../../.storybook/DocPageTemplate';
import { INPUT_MULTI_POSITION } from './const/inputMultiConstants';

const dropdownOptions = ['USD', 'CAD', 'EUR', 'INR'];
const defaultConfig = {
  title: 'Application/Components/InputWDropdown',
  component: InputWDropdown,
  parameters: {
    docs: {
      page: () => {
        return <DocPageTemplate importStatement={"import InputWDropdown from 'bifrost/InputWDropdown'"} />;
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
    dropdownName: {
      type: { summary: 'STRING', required: false },
      description: 'ABCDEFGHIJK',
      control: { type: 'text' },
      defaultValue: 'drop-down'
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
    multiPosition: {
      options: INPUT_MULTI_POSITION,
      control: { type: 'radio' },
      description: 'Lorem Ipsum',
      type: { summary: 'STRING', required: false },
      defaultValue: INPUT_MULTI_POSITION[0]
    }
  },
  controls: {}
};
const Template = (args) => <InputWDropdown {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };
