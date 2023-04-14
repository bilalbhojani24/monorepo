import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';

import HeaderBrand from './index';

const defaultConfig = {
  title: 'Application/Components/HeaderBrand',
  component: HeaderBrand,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={"import HeaderBrand from 'bifrost/HeaderBrand'"}
        />
      )
    }
  },
  argTypes: {
    productName: { defaultValue: 'app-live' }
  },
  controls: {}
};
const Template = (args) => <HeaderBrand {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };
