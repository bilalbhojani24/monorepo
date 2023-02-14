import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';

import SelectMenuTrigger from './index';

const defaultConfig = {
  title: 'Application/Components/SelectMenuTrigger',
  component: SelectMenuTrigger,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={
            "import SelectMenuTrigger from 'bifrost/SelectMenuTrigger'"
          }
        />
      )
    }
  },
  argTypes: {},
  controls: {}
};
const Template = (args) => <SelectMenuTrigger {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };
