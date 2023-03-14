import React from 'react';

// import { EnvelopeIcon } from '@heroicons/react/20/solid';
import DocPageTemplate from '../../.storybook/DocPageTemplate';
import { EnvelopeIcon } from '../Icon';

import {
  BUTTON_COLORS,
  BUTTON_ICON_PLACEMENT,
  BUTTON_SIZES,
  BUTTON_VARIANTS
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
      )
    }
  },
  argTypes: {
    variant: {
      // eslint-disable-next-line sonarjs/no-duplicate-string
      control: { type: 'inline-radio' },
      type: { summary: BUTTON_VARIANTS.join(', '), required: false },
      options: BUTTON_VARIANTS,
      description: 'Lorem'
    },
    size: {
      control: { type: 'inline-radio' },
      type: { summary: BUTTON_SIZES.join(', '), required: false },
      options: BUTTON_SIZES,
      description: 'Ipsum'
    },
    disabled: {
      control: { type: 'boolean' },
      type: { summary: 'BOOLEAN', required: false },
      description: 'Lorem Ipsum'
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: 'Lorem Ipsum',
      type: { summary: 'BOOLEAN', required: false },
      defaultValue: false
    },
    icon: {
      defaultValue: <EnvelopeIcon />
    },
    iconPlacement: {
      options: BUTTON_ICON_PLACEMENT,
      control: { type: 'inline-radio' },
      defaultValue: BUTTON_ICON_PLACEMENT[0]
    },
    colors: {
      options: BUTTON_COLORS,
      control: { type: 'inline-radio' },
      defaultValue: BUTTON_COLORS[0]
    },
    isIconOnlyButton: {
      options: [true, false],
      control: { type: 'inline-radio' },
      defaultValue: false
    },
    ariaLabel: {
      options: { type: 'string' },
      defaultValue: ''
    },
    loaderText: {
      control: { type: 'text' },
      type: { summary: 'TEXT', required: false },
      description: 'Text displayed when button is under loading state'
    }
  },
  controls: {}
};
const Template = (args) => {
  const { isIconOnlyButton } = args;
  return isIconOnlyButton ? (
    <Button {...args} />
  ) : (
    <Button {...args}>Button</Button>
  );
};
const Default = Template.bind({});
Default.parameters = {
  size: 'primary'
};

const IconOnly = Template.bind({});
IconOnly.parameters = {
  size: 'primary'
};

IconOnly.args = {
  isIconOnlyButton: true
};

const Primary = Template.bind({});
Primary.parameters = {
  size: 'primary'
};

Primary.args = {
  variant: BUTTON_VARIANTS[0]
};

const Secondary = Template.bind({});
Secondary.parameters = {
  size: 'primary'
};

Secondary.args = {
  variant: BUTTON_VARIANTS[1]
};

const Rounded = Template.bind({});
Rounded.parameters = {
  size: 'primary'
};

Rounded.args = {
  variant: BUTTON_VARIANTS[2]
};

const Minimal = Template.bind({});
Minimal.parameters = {
  size: 'primary'
};

Minimal.args = {
  variant: BUTTON_VARIANTS[3]
};

const FullWidth = Template.bind({});
FullWidth.parameters = {
  size: 'primary'
};

FullWidth.args = {
  fullWidth: true
};

const LoadingWithText = Template.bind({});
LoadingWithText.parameters = {
  size: 'primary'
};

LoadingWithText.args = {
  loaderText: 'Loading...',
  loading: true
};

const LoadingWithoutText = Template.bind({});
LoadingWithoutText.parameters = {
  size: 'primary'
};

LoadingWithoutText.args = {
  loading: true,
  isIconOnlyButton: true
};

const Disabled = Template.bind({});
Disabled.parameters = {
  size: 'primary'
};

Disabled.args = {
  disabled: true
};

export default defaultConfig;
export {
  Default,
  Disabled,
  FullWidth,
  IconOnly,
  LoadingWithoutText,
  LoadingWithText,
  Minimal,
  Primary,
  Rounded,
  Secondary
};
