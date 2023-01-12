import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';

import ModalBody from './index';

const defaultConfig = {
  title: 'Application/Components/ModalBody',
  component: ModalBody,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={"import ModalBody from 'bifrost/ModalBody'"}
        />
      ),
    },
  },

  argTypes: {
    children: {
      options: { type: null },
      defaultValue: 'I am modal body',
    },
  },
  controls: {},
};
const Template = (args) => <ModalBody {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {},
};

export default defaultConfig;
export { Primary };
