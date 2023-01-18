import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';

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

  argTypes: {},
  controls: {},
};
const Template = (args) => <TooltipFooter {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {},
};

export default defaultConfig;
export { Primary };
