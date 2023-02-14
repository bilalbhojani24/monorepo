import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';

import SelectMenuOptionsBox from './index';

const defaultConfig = {
  title: 'Application/Components/SelectMenuOptionsBox',
  component: SelectMenuOptionsBox,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={
            "import SelectMenuOptionsBox from 'bifrost/SelectMenuOptionsBox'"
          }
        />
      )
    }
  },
  argTypes: {},
  controls: {}
};
const Template = (args) => <SelectMenuOptionsBox {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };
