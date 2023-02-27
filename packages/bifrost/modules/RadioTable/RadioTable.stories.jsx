import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';

import { dummyData } from './const/radioTableConstants';
import RadioTable from './index';

const defaultConfig = {
  title: 'Application/Components/RadioTable',
  component: RadioTable,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={"import RadioTable from 'bifrost/RadioTable'"}
        />
      )
    }
  },
  argTypes: {
    options: {
      option: { type: null },
      defaultValue: dummyData
    }
  },
  controls: {}
};
const Template = (args) => <RadioTable {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };
