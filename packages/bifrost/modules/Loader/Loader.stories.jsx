import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';

import Loader from './index';

const defaultConfig = {
  title: 'Application/Components/Loader',
  component: Loader,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={"import Loader from 'bifrost/Loader'"}
        />
      )
    }
  },
  argTypes: {
    height: {
      option: { type: 'string' },
      defaultValue: ''
    },
    width: {
      option: { type: 'string' },
      defaultValue: ''
    },
    wrapperClassName: {
      option: { type: 'string' },
      defaultValue: 'text-base-300 fill-base-400'
    }
  },
  controls: {}
};
const Template = (args) => <Loader {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };
