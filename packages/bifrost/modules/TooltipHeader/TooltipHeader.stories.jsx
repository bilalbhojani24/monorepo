import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';

import TooltipHeader from './index';

const defaultConfig = {
  title: 'Application/Components/TooltipHeader',
  component: TooltipHeader,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={"import TooltipHeader from 'bifrost/TooltipHeader'"}
        />
      ),
    },
  },

  argTypes: {},
  controls: {},
};
const Template = (args) => <TooltipHeader {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {},
};

export default defaultConfig;
export { Primary };
