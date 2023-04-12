import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';

import ProgressBar from './index';

const steps = ['Vitae', 'Profile', 'Business', 'Theme', 'Preview'];

const defaultConfig = {
  title: 'Application/Components/ProgressBar',
  component: ProgressBar,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={"import ProgressBar from 'bifrost/ProgressBar'"}
        />
      )
    },
    design: {
      type: 'figma',
      url: ''
    }
  },
  argTypes: {
    steps: {
      type: { summary: 'OBJECT', required: false },
      description: 'List of items to be covered in steps',
      control: { type: 'object' },
      defaultValue: steps
    },
    label: {
      type: { summary: 'STRING', required: false },
      description: 'Provide label to overall Step component for accessibility',
      control: { type: 'text' },
      defaultValue: 'label'
    },
    title: {
      type: { summary: 'STRING', required: false },
      description: 'Provide title to Progress component',
      control: { type: 'text' },
      defaultValue: 'Title'
    },
    percentage: {
      type: { summary: 'NUMBER', required: false },
      description: 'Percentage of achieve progress',
      control: { type: 'number', min: 0, max: 100 },
      defaultValue: '0.0'
    },
    currentStep: {
      type: { summary: 'NUMBER', required: false },
      description: 'Active progression in the progress bar',
      control: { type: 'number', min: 0, max: 12, step: 1 },
      defaultValue: '0'
    },
    wrapperClassName: {
      type: { summary: 'STRING', required: false },
      description: 'Provide classnames to progress bar',
      control: { type: 'text' },
      defaultValue: ''
    }
  },
  controls: {}
};
const Template = (args) => <ProgressBar {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };
