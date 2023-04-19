import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import {
  TP_PLACEMENT_ALIGN,
  TP_PLACEMENT_SIDE,
  TP_SIZE,
  TP_STICKY_OPTIONS,
  TP_TOOLTIP_THEME
} from '../../shared/tooltipPopoverConstants';
import Button from '../Button';
import TooltipBody from '../TooltipBody';
import TooltipHeader from '../TooltipHeader';

import Tooltip from './index';

const inlineRadio = 'inline-radio';
const bodyText =
  'Lorem ipsum dolor sit amet lalala, consectetur adipiscing elit. Donec sodales augue eu viverra tempus.';
const headingText = 'This is a tooltip heading';

const defaultConfig = {
  title: 'Application/Components/Tooltip',
  component: Tooltip,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={"import Tooltip from 'bifrost/Tooltip'"}
        />
      )
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/GCu9Z0GTnebRUa5nioN6Yr/Tailwind-UI-Library?node-id=159-39732&t=TWCLo3KWhysdxj9F-0'
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
          <TooltipHeader>{headingText}</TooltipHeader>
          <TooltipBody>{bodyText}</TooltipBody>
        </>
      )
    },
    children: {
      option: { type: null },
      defaultValue: <Button>Hover me</Button>
    },
    delay: {
      option: { type: 'number' },
      defaultValue: 200
    },
    defaultOpen: {
      option: { type: 'boolean' },
      defaultValue: false
    },
    onOpenChange: {
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
    wrapperClassName: {
      options: { type: 'string' },
      defaultValue: ''
    },
    triggerWrapperClassName: {
      options: { type: 'string' },
      defaultValue: ''
    }
  },
  controls: {}
};
const Template = (args) => <Tooltip {...args} />;
const DarkThemeTemplate = (args) => <Tooltip {...args} />;
const LightThemeHyperlinkTemplate = (args) => <Tooltip {...args} />;
const DarkThemeHyperlinkTemplate = (args) => <Tooltip {...args} />;
const CustomTooltipTemplate = (args) => <Tooltip {...args} />;

const Primary = Template.bind({});
const DarkTheme = DarkThemeTemplate.bind({});
const LightThemeHyperlink = LightThemeHyperlinkTemplate.bind({});
const DarkThemeHyperlink = DarkThemeHyperlinkTemplate.bind({});
const CustomTooltip = CustomTooltipTemplate.bind({});

Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export {
  CustomTooltip,
  DarkTheme,
  DarkThemeHyperlink,
  LightThemeHyperlink,
  Primary
};

// CustomTooltip tooltip start
CustomTooltip.args = {
  theme: TP_TOOLTIP_THEME[1],
  content: <TooltipBody wrapperClassName="mb-0">{bodyText}</TooltipBody>
};
// CustomTooltip tooltip end

// Darktheme tooltip start
DarkTheme.args = {
  theme: TP_TOOLTIP_THEME[1],
  content: (
    <>
      <TooltipHeader>{headingText}</TooltipHeader>
      <TooltipBody>{bodyText}</TooltipBody>
    </>
  )
};
// Darktheme tooltip end

// LightThemeHyperlink tooltip start
LightThemeHyperlink.args = {
  content: (
    <>
      <TooltipHeader>{headingText}</TooltipHeader>
      <TooltipBody>{bodyText}</TooltipBody>
    </>
  )
};
// LightThemeHyperlink tooltip start

// DarkThemeHyperlink tooltip start
DarkThemeHyperlink.args = {
  theme: TP_TOOLTIP_THEME[1],
  content: (
    <>
      <TooltipHeader>{headingText}</TooltipHeader>
      <TooltipBody>{bodyText}</TooltipBody>
    </>
  )
};
// DarkThemeHyperlink tooltip start
