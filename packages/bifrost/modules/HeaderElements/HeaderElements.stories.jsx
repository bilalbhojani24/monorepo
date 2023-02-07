import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';

import HeaderElements from './index';

const defaultConfig = {
  title: 'Application/Components/HeaderElements',
  component: HeaderElements,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={
            "import HeaderElements from 'bifrost/HeaderElements'"
          }
        />
      )
    }
  },
  argTypes: {},
  controls: {}
};
const Template = (args) => <HeaderElements {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };
