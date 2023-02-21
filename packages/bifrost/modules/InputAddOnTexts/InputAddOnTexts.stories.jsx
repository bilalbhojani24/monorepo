import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';

import InputAddOnTexts from './index';

const defaultConfig = {
  title: 'Application/Components/InputAddOnTexts',
  component: InputAddOnTexts,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={
            "import InputAddOnTexts from 'bifrost/InputAddOnTexts'"
          }
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
    leadingAddOnText: {
      type: { summary: 'STRING', required: false },
      description: 'ABCDEFGHIJK',
      control: { type: 'text' },
      defaultValue: 'http://'
    },
    trailingAddOnText: {
      type: { summary: 'STRING', required: false },
      description: 'ABCDEFGHIJK',
      control: { type: 'text' },
      defaultValue: '.com'
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
    type: {
      type: { summary: 'STRING', required: false },
      description: 'ABCDEFGHIJK',
      control: { type: 'text' },
      defaultValue: 'text'
    }
  },
  controls: {}
};
const Template = (args) => <InputAddOnTexts {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };
