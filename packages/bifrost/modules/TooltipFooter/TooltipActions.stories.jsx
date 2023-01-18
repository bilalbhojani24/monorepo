import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import { TP_ACTION_ITEM_POSITION } from '../../shared/tooltipPopoverConstants';
import Button from '../Button';

import TooltipFooter from './index';

const defaultConfig = {
  title: 'Application/Components/TooltipFooter',
  component: TooltipFooter,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={"import TooltipFooter from 'bifrost/TooltipFooter'"}
        />
      ),
    },
  },

  argTypes: {
    children: {
      option: { type: null },
      defaultValue: (
        <>
          <Button>Action 1</Button>
          <Button colors="white">Action 2</Button>
        </>
      ),
    },
    position: {
      options: TP_ACTION_ITEM_POSITION,
      controls: { type: 'inline-radio' },
      defaultValue: TP_ACTION_ITEM_POSITION[0],
    },
    wrapperClass: {
      option: { type: 'string' },
      defaultValue: '',
    },
  },
  controls: {},
};
const Template = (args) => <TooltipFooter {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {},
};

export default defaultConfig;
export { Primary };
