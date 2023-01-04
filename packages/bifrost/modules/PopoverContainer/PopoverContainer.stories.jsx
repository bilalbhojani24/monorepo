import React from 'react';
import PopoverContainer from './index';
import DocPageTemplate from '../../.storybook/DocPageTemplate';
import Button from '../Button';
import { PLACEMENT_ALIGN, PLACEMENT_SIDE } from '../SharedTooltipPopover/const';

const defaultConfig = {
  title: 'Application/Components/PopoverContainer',
  component: PopoverContainer,
  parameters: {
    docs: {
      page: () => {
        return <DocPageTemplate importStatement={"import PopoverContainer from 'bifrost/PopoverContainer'"} />;
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
      defaultValue: <Button>Click me</Button>,
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
const Template = (args) => <PopoverContainer {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {},
};

export default defaultConfig;
export { Primary };
