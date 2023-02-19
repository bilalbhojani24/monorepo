import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';

import HeaderProductContainer from './index';

const defaultConfig = {
  title: 'Application/Components/HeaderProductContainer',
  component: HeaderProductContainer,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={
            "import HeaderProductContainer from 'bifrost/HeaderProductContainer'"
          }
        />
      )
    }
  },
  argTypes: {},
  controls: {}
};
const Template = (args) => <HeaderProductContainer {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };
