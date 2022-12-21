import React from 'react';
import Steps from './index';
import DocPageTemplate from '../../.storybook/DocPageTemplate';
import { STEPS_STATUS } from './const/stepsConstants';

const steps = [
  { name: 'Create account', description: 'Vitae sed mi luctus laoreet.', status: STEPS_STATUS[0] },
  {
    name: 'Profile information',
    description: 'Cursus semper viverra facilisis et et some more.',
    status: STEPS_STATUS[1]
  },
  { name: 'Business information', description: 'Penatibus eu quis ante.', status: STEPS_STATUS[2] },
  { name: 'Theme', description: 'Faucibus nec enim leo et.', status: STEPS_STATUS[2] },
  { name: 'Preview', description: 'Iusto et officia maiores porro ad non quas.', status: STEPS_STATUS[2] }
];

const defaultConfig = {
  title: 'Application/Components/Steps',
  component: Steps,
  parameters: {
    docs: {
      page: () => {
        return <DocPageTemplate importStatement={"import Steps from 'bifrost/Steps'"} />;
      }
    }
  },
  argTypes: {
    steps: {
      type: { summary: 'OBJECT', required: false },
      description: 'ABCDEFGHIJK',
      control: { type: 'object' },
      defaultValue: steps
    },
    onClick: {
      type: { summary: 'FUNCTION', required: false },
      description: 'ABCDEFGHIJK',
      control: { type: 'select' }
      //   defaultValue: SH_VARIANTS[1]
    },
    label: {
      type: { summary: 'STRING', required: false },
      description: 'ABCDEFGHIJK',
      control: { type: 'text' },
      defaultValue: 'label'
    }
  },
  controls: {}
};
const Template = (args) => <Steps {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };
