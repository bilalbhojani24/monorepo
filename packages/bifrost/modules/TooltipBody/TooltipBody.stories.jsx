import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';

import TooltipBody from './index';

const defaultConfig = {
  title: 'Application/Components/TooltipBody',
  component: TooltipBody,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={"import TooltipBody from 'bifrost/TooltipBody'"}
        />
      ),
    },
  },

  argTypes: {},
  controls: {},
};
const Template = (args) => <TooltipBody {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {},
};

export default defaultConfig;
export { Primary };
