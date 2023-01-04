import React from 'react';
import Steps from './index';
import DocPageTemplate from '../../.storybook/DocPageTemplate';
import { STEPS_STATUS, STEPS_FORMAT } from './const/stepsConstants';

const steps = [
  { id: '1', name: 'Create account', description: 'Vitae sed mi luctus laoreet.', status: STEPS_STATUS[0] },
  {
    id: '2',
    name: 'Profile information',
    description: 'Cursus semper viverra facilisis et et some more.',
    status: STEPS_STATUS[1],
  },
  { id: '3', name: 'Business information', description: 'Penatibus eu quis ante.', status: STEPS_STATUS[2] },
  { id: '4', name: 'Theme', description: 'Faucibus nec enim leo et.', status: STEPS_STATUS[2] },
  { id: '5', name: 'Preview', description: 'Iusto et officia maiores porro ad non quas.', status: STEPS_STATUS[2] },
];

const defaultConfig = {
  title: 'Application/Components/Steps',
  component: Steps,
  parameters: {
    docs: {
      page: () => {
        return <DocPageTemplate importStatement={"import Steps from 'bifrost/Steps'"} />;
      },
    },
  },
  argTypes: {
    steps: {
      type: { summary: 'OBJECT', required: false },
      description: 'List of items to be covered in steps',
      control: { type: 'object' },
      defaultValue: steps,
    },
    onClick: {
      type: { summary: 'FUNCTION', required: false },
      description: 'Function callback when a step is clicked',
      control: { type: 'select' },
    },
    label: {
      type: { summary: 'STRING', required: false },
      description: 'Provide label to overall Step component for accessibility',
      control: { type: 'text' },
      defaultValue: 'label',
    },
    format: {
      options: STEPS_FORMAT,
      control: { type: 'select' },
      description: 'Format of list types',
      type: { summary: 'STRING', required: false },
      defaultValue: STEPS_FORMAT[0],
    },
  },
  controls: {},
};
const Template = (args) => <Steps {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {},
};

export default defaultConfig;
export { Primary };
