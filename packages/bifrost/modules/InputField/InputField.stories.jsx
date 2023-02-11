import React from 'react';
import { UsersIcon } from '@heroicons/react/20/solid';

import DocPageTemplate from '../../.storybook/DocPageTemplate';

import InputField from './index';

const defaultConfig = {
  title: 'Application/Components/InputField',
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
    },
    isTrailingNodeClickable: {
      control: { type: 'boolean' },
      type: { summary: 'BOOLEAN', required: false },
      description: 'Pass true if trailing icon should be clickable',
      defaultValue: false
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
