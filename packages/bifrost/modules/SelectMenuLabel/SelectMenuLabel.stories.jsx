import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';

import SelectMenuLabel from './index';

const defaultConfig = {
  title: 'Application/Components/SelectMenuLabel',
  component: SelectMenuLabel,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={
            "import SelectMenuLabel from 'bifrost/SelectMenuLabel'"
          }
        />
      )
    }
  },
  argTypes: {},
  controls: {}
};
const Template = (args) => <SelectMenuLabel {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };
