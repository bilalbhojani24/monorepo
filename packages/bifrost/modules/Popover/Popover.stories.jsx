import React from 'react';
import Popover from './index';
import DocPageTemplate from '../../.storybook/DocPageTemplate';
import { PLACEMENT_ALIGN, TOOLTIP_THEME, PLACEMENT_SIDE, BUTTON_TYPE } from '../SharedTooltipPopover/const';
import Button from '../Button';

const defaultConfig = {
  title: 'Application/Components/Popover',
  component: Popover,
  parameters: {
    docs: {
      page: () => {
        return <DocPageTemplate importStatement={"import Popover from 'bifrost/Popover'"} />;
      },
    },
  },
  argTypes: {
    actionObject: {
      option: { type: 'object' },
      defaultValue: {
        primaryButtonLabel: 'Action 1',
        primaryButtonAction: () => {
          console.log('primaryButtonAction');
        },
        primaryButtonUrl: 'www.facebook.com',
        secondaryButtonLabel: 'Action 2',
        secondaryButtonAction: () => {
          console.log('secondaryButtonAction');
        },
        secondaryButtonUrl: 'www.facebook.com',
      },
    },
    buttonType: {
      options: BUTTON_TYPE,
      control: { type: 'inline-radio' },
      defaultValue: BUTTON_TYPE[0],
    },
    children: {
      option: { type: null },
      defaultValue: <Button>Click me</Button>,
    },
    description: {
      option: { type: 'string' },
      defaultValue:
        'Lorem ipsum dolor sit amet lalala, consectetur adipiscing elit. Donec sodales augue eu viverra tempus.',
    },
    theme: {
      options: TOOLTIP_THEME,
      control: { type: 'inline-radio' },
      defaultValue: TOOLTIP_THEME[0],
    },
    title: {
      option: { type: 'string' },
      defaultValue: 'This is a tooltip heading',
    },
    placementAlign: {
      options: PLACEMENT_ALIGN,
      control: { type: 'inline-radio' },
      defaultValue: PLACEMENT_ALIGN[0],
    },
    placementSide: {
      options: PLACEMENT_SIDE,
      control: { type: 'inline-radio' },
      defaultValue: PLACEMENT_SIDE[0],
    },
  },
  controls: {},
};
const Template = (args) => <Popover {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {},
};

export default defaultConfig;
export { Primary };
