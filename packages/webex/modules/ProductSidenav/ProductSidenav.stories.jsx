import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';

import ProductSidenav from './index';

const defaultConfig = {
  title: 'Application/Components/ProductSidenav',
  component: ProductSidenav,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={
            "import ProductSidenav from 'bifrost/ProductSidenav'"
          }
        />
      )
    }
  },
  argTypes: {
    activeProduct: {
      option: { type: 'string' },
      defaultValue: 'App Live'
    }
  },
  controls: {}
};
const Template = (args) => <ProductSidenav {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };
