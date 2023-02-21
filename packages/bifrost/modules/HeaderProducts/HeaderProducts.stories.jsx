import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';

import HeaderProducts from './index';

const defaultConfig = {
  title: 'Application/Components/HeaderProducts',
  component: HeaderProducts,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={
            "import HeaderProducts from 'bifrost/HeaderProducts'"
          }
        />
      )
    }
  },
  argTypes: {},
  controls: {}
};
const Template = (args) => <HeaderProducts {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };
