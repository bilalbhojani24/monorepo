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
            "import { ProductSidenav } from '@browserstack/webex'"
          }
        />
      )
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/Q1Gb1tXdo227C99VLfHwz0/Navigation-for-Signed-out-%26-Signed-In?node-id=1817%3A345181&mode=dev'
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
