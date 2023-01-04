import React from 'react';
import InputField from './index';
import { UsersIcon } from '@heroicons/react/20/solid';
import DocPageTemplate from '../../.storybook/DocPageTemplate';

const defaultConfig = {
  title: 'Application/Components/InputField',
  component: InputField,
  parameters: {
    docs: {
      page: () => {
        return <DocPageTemplate importStatement={"import InputField from 'bifrost/InputField'"} />;
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
      defaultValue: <UsersIcon className="h-5 w-5 text-gray-400" />
    },
    trailingIcon: {
      type: { summary: 'NODE', required: false },
      description: 'ABCDEFGHIJK',
      //   control: { type: null },
      defaultValue: <UsersIcon className="h-5 w-5 text-gray-400" />
    },
    placeholder: {
      type: { summary: 'STRING', required: false },
      description: 'ABCDEFGHIJK',
      control: { type: 'text' },
      defaultValue: 'Placeholder text'
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
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };
