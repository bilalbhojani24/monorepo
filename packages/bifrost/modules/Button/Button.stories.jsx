import React from 'react';

// import { EnvelopeIcon } from '@heroicons/react/20/solid';
import DocPageTemplate from '../../.storybook/DocPageTemplate';
import { EnvelopeIcon } from '../Icon';

import {
  BUTTON_FORMAT,
  BUTTON_ICON_PLACEMENT,
  BUTTON_SIZES,
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
    buttonFormat: {
      control: { type: 'inline-radio' },
      type: { summary: BUTTON_FORMAT.join(', '), required: false },
      options: BUTTON_FORMAT,
      description: 'Lorem Ipsum ',
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: 'Lorem Ipsum',
      type: { summary: 'BOOLEAN', required: false },
      defaultValue: { summary: 'false' },
    },
    icon: {
      defaultValue: <EnvelopeIcon />,
    },
    iconPlacement: {
      options: BUTTON_ICON_PLACEMENT,
      control: { type: 'inline-radio' },
      defaultValue: BUTTON_ICON_PLACEMENT[0],
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
