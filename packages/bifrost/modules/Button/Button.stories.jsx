import React from 'react';
import { expect } from '@storybook/jest';
import { userEvent, within } from '@storybook/testing-library';

// import { EnvelopeIcon } from '@heroicons/react/20/solid';
import DocPageTemplate from '../../.storybook/DocPageTemplate';
import { EnvelopeIcon } from '../Icon';

import {
  BUTTON_COLORS,
  BUTTON_ICON_PLACEMENT,
  BUTTON_SIZES,
  BUTTON_TYPES,
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
    },
    type: {
      options: BUTTON_TYPES,
      control: { type: 'inline-radio' },
      defaultValue: BUTTON_TYPES[0]
    }
  },
  controls: {}
};

const buttonText = 'Button';
const loadingText = 'Loading...';

const Template = (args) => {
  const { isIconOnlyButton } = args;
  return isIconOnlyButton ? (
    <Button {...args} />
  ) : (
    <Button {...args}>Button</Button>
  );
};
const Default = Template.bind({});
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await expect(canvas.getByText(buttonText)).toBeVisible();
  await expect(canvas.getByRole('button')).toBeVisible();
  await userEvent.click(canvas.getByRole('button'));
};
Default.parameters = {
  size: 'primary'
};

const IconOnly = Template.bind({});
IconOnly.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await expect(canvas.getByRole('button')).toBeVisible();
  await userEvent.click(canvas.getByRole('button'));
};
IconOnly.parameters = {
  size: 'primary'
};

IconOnly.args = {
  isIconOnlyButton: true
};

const Primary = Template.bind({});
Primary.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await expect(canvas.getByText(buttonText)).toBeVisible();
  await expect(canvas.getByRole('button')).toBeVisible();
  await userEvent.click(canvas.getByRole('button'));
};
Primary.parameters = {
  size: 'primary'
};

Primary.args = {
  variant: BUTTON_VARIANTS[0]
};

const Secondary = Template.bind({});
Secondary.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await expect(canvas.getByText(buttonText)).toBeVisible();
  await expect(canvas.getByRole('button')).toBeVisible();
  await userEvent.click(canvas.getByRole('button'));
};
Secondary.parameters = {
  size: 'primary'
};

Secondary.args = {
  variant: BUTTON_VARIANTS[1]
};

const Rounded = Template.bind({});
Rounded.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await expect(canvas.getByText(buttonText)).toBeVisible();
  await expect(canvas.getByRole('button')).toBeVisible();
  await userEvent.click(canvas.getByRole('button'));
};
Rounded.parameters = {
  size: 'primary'
};

Rounded.args = {
  variant: BUTTON_VARIANTS[2]
};

const Minimal = Template.bind({});
Minimal.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await expect(canvas.getByText(buttonText)).toBeVisible();
  await expect(canvas.getByRole('button')).toBeVisible();
  await userEvent.click(canvas.getByRole('button'));
};
Minimal.parameters = {
  size: 'primary'
};

Minimal.args = {
  variant: BUTTON_VARIANTS[3]
};

const FullWidth = Template.bind({});
FullWidth.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await expect(canvas.getByText(buttonText)).toBeVisible();
  await expect(canvas.getByRole('button')).toBeVisible();
  await userEvent.click(canvas.getByRole('button'));
};
FullWidth.parameters = {
  size: 'primary'
};

FullWidth.args = {
  fullWidth: true
};

const LoadingWithText = Template.bind({});
LoadingWithText.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await expect(canvas.getByRole('button')).toBeVisible();
  await userEvent.click(canvas.getByRole('button'));
};
LoadingWithText.parameters = {
  size: 'primary'
};

LoadingWithText.args = {
  loaderText: 'Loading...',
  loading: true
};

const LoadingWithoutText = Template.bind({});
LoadingWithoutText.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await expect(canvas.getByRole('button')).toBeVisible();
  await userEvent.click(canvas.getByRole('button'));
};
LoadingWithoutText.parameters = {
  size: 'primary'
};

LoadingWithoutText.args = {
  loading: true,
  isIconOnlyButton: true
};

const Disabled = Template.bind({});
Disabled.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await expect(canvas.getByText(buttonText)).toBeVisible();
  await expect(canvas.getByRole('button')).toBeVisible();
  await userEvent.click(canvas.getByRole('button'));
};
Disabled.parameters = {
  size: 'primary'
};

Disabled.args = {
  disabled: true
};

const CustomButtonType = Template.bind({});
CustomButtonType.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await expect(canvas.getByText(buttonText)).toBeVisible();
  await expect(canvas.getByRole('button')).toBeVisible();
  await userEvent.click(canvas.getByRole('button'));
};
CustomButtonType.args = {
  type: 'submit'
};

export default defaultConfig;
export {
  CustomButtonType,
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
