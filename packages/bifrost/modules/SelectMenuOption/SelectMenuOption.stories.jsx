import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';

import SelectMenuOption from './index';

const defaultConfig = {
  title: 'Application/Components/SelectMenuOption',
  component: SelectMenuOption,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={
            "import SelectMenuOption from 'bifrost/SelectMenuOption'"
          }
        />
      )
    }
  },
  argTypes: {},
  controls: {}
};
const Template = (args) => <SelectMenuOption {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };
