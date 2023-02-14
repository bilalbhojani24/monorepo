import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';

import Switch from './index';

const defaultConfig = {
  title: 'Application/Components/Switch',
  component: Switch,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={"import Switch from 'bifrost/Switch'"}
        />
      )
    }
  },
  argTypes: {
    isShortToggle: {
      control: { type: 'boolean' },
      description: 'Lorem Ipsum',
      type: { summary: 'BOOLEAN', required: false },
      defaultValue: false
    },
    leftDescription: {
      type: { summary: 'STRING', required: false },
      description: 'ABCDEFGHIJK',
      control: { type: 'text' },
      defaultValue: ''
    },
    leftLabel: {
      type: { summary: 'STRING', required: false },
      description: 'ABCDEFGHIJK',
      control: { type: 'text' },
      defaultValue: ''
    },
    leftSubLabel: {
      type: { summary: 'STRING', required: false },
      description: 'ABCDEFGHIJK',
      control: { type: 'text' },
      defaultValue: ''
    },
    rightDescription: {
      type: { summary: 'STRING', required: false },
      description: 'ABCDEFGHIJK',
      control: { type: 'text' },
      defaultValue: ''
    },
    rightLabel: {
      type: { summary: 'STRING', required: false },
      description: 'ABCDEFGHIJK',
      control: { type: 'text' },
      defaultValue: ''
    },
    rightSubLabel: {
      type: { summary: 'STRING', required: false },
      description: 'ABCDEFGHIJK',
      control: { type: 'text' },
      defaultValue: ''
    },
    wrapperClassName: {
      type: { summary: 'STRING', required: false },
      description: 'ABCDEFGHIJK',
      control: { type: 'text' },
      defaultValue: ''
    },
    defaultValue: {
      control: { type: 'boolean' },
      description: 'Default value of select',
      type: { summary: 'BOOLEAN', required: false },
      defaultValue: false
    }
  },
  controls: {}
};
const Template = (args) => <Switch {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };
