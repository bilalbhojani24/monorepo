import React from 'react';
import Tooltip from './index';
import DocPageTemplate from '../../.storybook/DocPageTemplate';
import Button from '../Button';
import { PLACEMENT_ALIGN, PLACEMENT_SIDE } from '../TooltipContainer/const/tooltipContainerConstants';
import { TOOLTIP_THEME } from './const/tooltipConstants';

const defaultConfig = {
  title: 'Application/Components/Tooltip',
  component: Tooltip,
  parameters: {
    docs: {
      page: () => {
        return <DocPageTemplate importStatement={"import Tooltip from 'bifrost/Tooltip'"} />;
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
        secondaryButtonLabel: 'Action 2',
        secondaryButtonAction: () => {
          console.log('secondaryButtonAction');
        },
      },
    },
    children: {
      option: { type: null },
      defaultValue: <Button>Hover me</Button>,
    },

    delay: {
      option: { type: 'number' },
      defaultValue: 200,
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
const Template = (args) => <Tooltip {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {},
};

export default defaultConfig;
export { Primary };
