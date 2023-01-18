import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import {
  TP_PLACEMENT_ALIGN,
  TP_PLACEMENT_SIDE,
  TP_SIZE,
  TP_TOOLTIP_THEME,
} from '../../shared/tooltipPopoverConstants';
import Button from '../Button';
import Hyperlink from '../Hyperlink';
import TooltipBody from '../TooltipBody';
import TooltipFooter from '../TooltipFooter';
import TooltipHeader from '../TooltipHeader';

import Popover from './index';

const inlineRadio = 'inline-radio';

const defaultConfig = {
  title: 'Application/Components/Popover',
  component: Popover,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={"import Popover from 'bifrost/Popover'"}
        />
      ),
    },
  },

  argTypes: {
    arrowClassName: {
      option: { type: 'string' },
      defaultValue: '',
    },
    content: {
      option: { type: null },
      defaultValue: (
        <>
          <TooltipHeader>This is a tooltip heading</TooltipHeader>
          <TooltipBody>
            Lorem ipsum dolor sit amet lalala, consectetur adipiscing elit.
            Donec sodales augue eu viverra tempus.
          </TooltipBody>
          <TooltipFooter>
            <Button>Action 1</Button>
            <Button colors="white">Action 2</Button>
          </TooltipFooter>
        </>
      ),
    },
    children: {
      option: { type: null },
      defaultValue: <Button>Click me</Button>,
    },

    placementAlign: {
      options: TP_PLACEMENT_ALIGN,
      control: { type: inlineRadio },
      defaultValue: TP_PLACEMENT_ALIGN[0],
    },
    placementSide: {
      options: TP_PLACEMENT_SIDE,
      control: { type: inlineRadio },
      defaultValue: TP_PLACEMENT_SIDE[0],
    },
    size: {
      options: TP_SIZE,
      control: { type: inlineRadio },
      defaultValue: TP_SIZE[0],
    },
    theme: {
      options: TP_TOOLTIP_THEME,
      control: { type: inlineRadio },
      defaultValue: TP_TOOLTIP_THEME[0],
    },
  },
  controls: {},
};
const Template = (args) => <Popover {...args} />;
const DarkThemeTemplate = (args) => <Popover {...args} />;
const LightThemeHyperlinkTemplate = (args) => <Popover {...args} />;
const DarkThemeHyperlinkTemplate = (args) => <Popover {...args} />;

const Primary = Template.bind({});
const DarkTheme = DarkThemeTemplate.bind({});
const LightThemeHyperlink = LightThemeHyperlinkTemplate.bind({});
const DarkThemeHyperlink = DarkThemeHyperlinkTemplate.bind({});
Primary.parameters = {
  controls: {},
};

export default defaultConfig;
export { DarkTheme, DarkThemeHyperlink, LightThemeHyperlink, Primary };

// Darktheme tooltip start
DarkTheme.args = {
  theme: TP_TOOLTIP_THEME[1],
  content: (
    <>
      <TooltipHeader>This is a tooltip heading</TooltipHeader>
      <TooltipBody>
        Lorem ipsum dolor sit amet lalala, consectetur adipiscing elit. Donec
        sodales augue eu viverra tempus.
      </TooltipBody>
      <TooltipFooter>
        <Button>Action 1</Button>
        <Button
          // colors="white"
          wrapperClassName="bg-base-600 text-white outline-0"
        >
          Action 2
        </Button>
      </TooltipFooter>
    </>
  ),
};
// Darktheme tooltip end

// LightThemeHyperlink tooltip start
LightThemeHyperlink.args = {
  content: (
    <>
      <TooltipHeader>This is a tooltip heading</TooltipHeader>
      <TooltipBody>
        Lorem ipsum dolor sit amet lalala, consectetur adipiscing elit. Donec
        sodales augue eu viverra tempus.
      </TooltipBody>
      <TooltipFooter>
        <Hyperlink
          underlined
          fontWeight="font-light"
          color="text-brand-600"
          wrapperClassName="mr-4"
          href="https://www.google.com"
          rel="noreferrer noopener"
        >
          Action 1
        </Hyperlink>
        <Hyperlink
          underlined
          fontWeight="font-light"
          color="text-brand-600"
          wrapperClassName="mr-4"
          href="https://www.google.com"
          rel="noreferrer noopener"
        >
          Action 1
        </Hyperlink>
      </TooltipFooter>
    </>
  ),
};
// LightThemeHyperlink tooltip start

// DarkThemeHyperlink tooltip start
DarkThemeHyperlink.args = {
  theme: TP_TOOLTIP_THEME[1],
  content: (
    <>
      <TooltipHeader>This is a tooltip heading</TooltipHeader>
      <TooltipBody>
        Lorem ipsum dolor sit amet lalala, consectetur adipiscing elit. Donec
        sodales augue eu viverra tempus.
      </TooltipBody>
      <TooltipFooter>
        <Hyperlink
          underlined
          fontWeight="font-light"
          color="text-base-50"
          wrapperClassName="mr-4"
          href="https://www.google.com"
          rel="noreferrer noopener"
        >
          Action 1
        </Hyperlink>
        <Hyperlink
          underlined
          fontWeight="font-light"
          color="text-base-50"
          href="https://www.google.com"
          rel="noreferrer noopener"
        >
          Action 1
        </Hyperlink>
      </TooltipFooter>
    </>
  ),
};
// DarkThemeHyperlink tooltip start
