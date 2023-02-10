import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import HeaderBrand from '../HeaderBrand';
import HeaderElements from '../HeaderElements';
import HeaderProducts from '../HeaderProducts';

import Header from './index';

const defaultConfig = {
  title: 'Application/Components/Header',
  component: Header,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={"import Header from 'bifrost/Header'"}
        />
      )
    }
  },
  argTypes: {
    children: {
      option: { type: null },
      defaultValue: (
        <>
          <HeaderBrand productName="Test Management" />
          <HeaderProducts wrapperClassName="max-[1360px]:hidden" />
          <div className="float-right ml-auto">
            <HeaderElements />
          </div>
        </>
      )
    },
    containerWrapperClass: {
      option: { type: 'string' },
      defaultValue: ''
    }
  },
  controls: {}
};
const Template = (args) => <Header {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };
