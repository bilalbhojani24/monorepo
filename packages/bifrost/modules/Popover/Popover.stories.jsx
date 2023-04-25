import React from 'react';
import { expect } from '@storybook/jest';
import { userEvent, within } from '@storybook/testing-library';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import {
  TP_PLACEMENT_ALIGN,
  TP_PLACEMENT_SIDE,
  TP_SIZE,
  TP_STICKY_OPTIONS,
  TP_TOOLTIP_THEME
} from '../../shared/tooltipPopoverConstants';
import Button from '../Button';
import Hyperlink from '../Hyperlink';
import PopoverBody from '../TooltipBody';
import PopoverFooter from '../TooltipFooter';
import PopoverHeader from '../TooltipHeader';

import Popover from './index';

const inlineRadio = 'inline-radio';
const headingText = 'This is a tooltip heading';
const bodyText =
  'Lorem ipsum dolor sit amet lalala, consectetur adipiscing elit. Donec sodales augue eu viverra tempus.';

const defaultConfig = {
  title: 'Application/Components/Popover',
  component: Popover,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={"import Popover from 'bifrost/Popover'"}
        />
      )
    },
    design: {
      type: 'figma',
      url: ''
    }
  },

  argTypes: {
    arrowClassName: {
      option: { type: 'string' },
      defaultValue: ''
    },
    arrowWidth: {
      option: { type: 'number' },
      defaultValue: 20
    },
    arrowHeight: {
      option: { type: 'number' },
      defaultValue: 10
    },
    arrowPadding: {
      option: { type: 'number' },
      defaultValue: 10
    },
    alignOffset: {
      option: { type: 'number' },
      defaultValue: 10
    },
    avoidCollisions: {
      option: { type: 'boolean' },
      defaultValue: true
    },
    content: {
      option: { type: null },
      defaultValue: (
        <>
          <PopoverHeader>This is a tooltip heading</PopoverHeader>
          <PopoverBody>
            Lorem ipsum dolor sit amet lalala, consectetur adipiscing elit.
            Donec sodales augue eu viverra tempus.
          </PopoverBody>
          <PopoverFooter>
            <Button>Action 1</Button>
            <Button colors="white">Action 2</Button>
          </PopoverFooter>
        </>
      )
    },
    children: {
      option: { type: null },
      defaultValue: <Button>Hover me</Button>
    },
    defaultOpen: {
      option: { type: 'boolean' },
      defaultValue: false
    },
    forceMount: {
      option: { type: 'boolean' },
      defaultValue: undefined
    },
    hideWhenDetached: {
      option: { type: 'boolean' },
      defaultValue: false
    },
    modal: {
      option: { type: 'boolean' },
      defaultValue: false
    },
    onOpenChange: {
      option: { type: null },
      defaultValue: null
    },
    onOpenAutoFocus: {
      option: { type: null },
      defaultValue: null
    },
    onCloseAutoFocus: {
      option: { type: null },
      defaultValue: null
    },
    onEscapeKeyDown: {
      option: { type: null },
      defaultValue: null
    },
    onPointerDownOutside: {
      option: { type: null },
      defaultValue: null
    },
    onFocusOutside: {
      option: { type: null },
      defaultValue: null
    },
    onInteractOutside: {
      option: { type: null },
      defaultValue: null
    },
    placementAlign: {
      options: TP_PLACEMENT_ALIGN,
      control: { type: inlineRadio },
      defaultValue: TP_PLACEMENT_ALIGN[0]
    },
    placementSide: {
      options: TP_PLACEMENT_SIDE,
      control: { type: inlineRadio },
      defaultValue: TP_PLACEMENT_SIDE[0]
    },
    show: {
      option: { type: 'boolean' },
      defaultValue: undefined
    },
    sideOffset: {
      option: { type: 'number' },
      defaultValue: 5
    },
    size: {
      options: TP_SIZE,
      control: { type: inlineRadio },
      defaultValue: TP_SIZE[0]
    },
    sticky: {
      options: TP_STICKY_OPTIONS,
      control: { type: inlineRadio },
      defaultValue: TP_STICKY_OPTIONS[0]
    },
    theme: {
      options: TP_TOOLTIP_THEME,
      control: { type: inlineRadio },
      defaultValue: TP_TOOLTIP_THEME[0]
    },
    triggerWrapperClassName: {
      option: { type: 'string' },
      defaultValue: ''
    },
    triggerAsChild: {
      option: { type: 'boolean' },
      defaultValue: true
    },
    wrapperClassName: {
      option: { type: 'string' },
      defaultValue: ''
    }
  },
  controls: {}
};
const Template = (args) => <Popover {...args} />;
const DarkThemeTemplate = (args) => <Popover {...args} />;
const LightThemeHyperlinkTemplate = (args) => <Popover {...args} />;
const DarkThemeHyperlinkTemplate = (args) => <Popover {...args} />;

const Primary = Template.bind({});
Primary.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await expect(canvas.getByRole('button')).toBeVisible();
  await userEvent.click(canvas.getByRole('button'));
};

const DarkTheme = DarkThemeTemplate.bind({});
DarkTheme.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await expect(canvas.getByRole('button')).toBeVisible();
  await userEvent.click(canvas.getByRole('button'));
};

const LightThemeHyperlink = LightThemeHyperlinkTemplate.bind({});
LightThemeHyperlink.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await expect(canvas.getByRole('button')).toBeVisible();
  await userEvent.click(canvas.getByRole('button'));
};

const DarkThemeHyperlink = DarkThemeHyperlinkTemplate.bind({});
DarkThemeHyperlink.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await expect(canvas.getByRole('button')).toBeVisible();
  await userEvent.click(canvas.getByRole('button'));
};

Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { DarkTheme, DarkThemeHyperlink, LightThemeHyperlink, Primary };

// Darktheme tooltip start
DarkTheme.args = {
  theme: TP_TOOLTIP_THEME[1],
  content: (
    <>
      <PopoverHeader>{headingText}</PopoverHeader>
      <PopoverBody>{bodyText}</PopoverBody>
      <PopoverFooter>
        <Button>Action 1</Button>
        <Button
          // colors="white"
          wrapperClassName="bg-base-600 text-white outline-0"
        >
          Action 2
        </Button>
      </PopoverFooter>
    </>
  )
};
// Darktheme tooltip end

// LightThemeHyperlink tooltip start
LightThemeHyperlink.args = {
  content: (
    <>
      <PopoverHeader>{headingText}</PopoverHeader>
      <PopoverBody>{bodyText}</PopoverBody>
      <PopoverFooter>
        <Hyperlink
          wrapperClassName="mr-4 font-normal text-brand-600 underline"
          isCSR={false}
          href="https://www.google.com"
          rel="noreferrer noopener"
        >
          Action 1
        </Hyperlink>
        <Hyperlink
          wrapperClassName="mr-4 font-normal text-brand-600 underline"
          isCSR={false}
          href="https://www.google.com"
          rel="noreferrer noopener"
        >
          Action 1
        </Hyperlink>
      </PopoverFooter>
    </>
  )
};
// LightThemeHyperlink tooltip start

// DarkThemeHyperlink tooltip start
DarkThemeHyperlink.args = {
  theme: TP_TOOLTIP_THEME[1],
  content: (
    <>
      <PopoverHeader>{headingText}</PopoverHeader>
      <PopoverBody>{bodyText}</PopoverBody>
      <PopoverFooter>
        <Hyperlink
          wrapperClassName="mr-4 font-normal text-base-50 underline"
          isCSR={false}
          href="https://www.google.com"
          rel="noreferrer noopener"
        >
          Action 1
        </Hyperlink>
        <Hyperlink
          wrapperClassName="mr-4 font-normal text-base-50 underline"
          href="https://www.google.com"
          rel="noreferrer noopener"
        >
          Action 1
        </Hyperlink>
      </PopoverFooter>
    </>
  )
};
// DarkThemeHyperlink tooltip start
