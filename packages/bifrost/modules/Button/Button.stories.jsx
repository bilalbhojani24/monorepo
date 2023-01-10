import React from 'react';

// import { EnvelopeIcon } from '@heroicons/react/20/solid';
import DocPageTemplate from '../../.storybook/DocPageTemplate';

import {
  BUTTON_SIZES,
  BUTTON_TYPES,
  BUTTON_VARIANTS,
} from './const/buttonConstants';
import Button from './index';

const defaultConfig = {
  title: 'Application/Components/Button',
  component: Button,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={"import Button from 'bifrost/Button'"}
        />
      ),
    },
  },
  argTypes: {
    variant: {
      control: { type: 'inline-radio' },
      type: { summary: BUTTON_VARIANTS.join(', '), required: false },
      options: BUTTON_VARIANTS,
      description: 'Lorem Ipsum',
    },
    size: {
      control: { type: 'inline-radio' },
      type: { summary: BUTTON_SIZES.join(', '), required: false },
      options: BUTTON_SIZES,
      description: 'Lorem Ipsum',
    },
    disabled: {
      control: { type: 'boolean' },
      type: { summary: 'BOOLEAN', required: false },
      description: 'Lorem Ipsum',
    },
    buttonType: {
      control: { type: 'inline-radio' },
      type: { summary: BUTTON_TYPES.join(', '), required: false },
      options: BUTTON_TYPES,
      description: 'Lorem Ipsum ',
    },
  },
  controls: {},
};
const Template = (args) => <Button {...args}>Button</Button>;
const Default = Template.bind({});
Default.parameters = {
  size: 'primary',
};

export default defaultConfig;
export { Default };
