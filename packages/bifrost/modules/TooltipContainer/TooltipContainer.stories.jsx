import React from 'react';
import TooltipContainer from './index';
import DocPageTemplate from '../../.storybook/DocPageTemplate';
import Button from '../Button';
import { PLACEMENT_ALIGN, PLACEMENT_SIDE } from '../SharedTooltipPopover/const';

const defaultConfig = {
  title: 'Application/Components/TooltipContainer',
  component: TooltipContainer,
  parameters: {
    docs: {
      page: () => {
        return <DocPageTemplate importStatement={"import TooltipContainer from 'bifrost/TooltipContainer'"} />;
      },
    },
  },
  argTypes: {
    arrowClassName: {
      option: { type: 'string' },
      defaultValue: '',
    },
    content: {
      option: { type: null },
      defaultValue: 'I am content on tooltip',
    },
    children: {
      option: { type: null },
      defaultValue: <Button>Hover me</Button>,
    },
    delay: {
      option: { type: 'number' },
      defaultValue: 200,
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
const Template = (args) => <TooltipContainer {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {},
};

export default defaultConfig;
export { Primary };
