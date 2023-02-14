import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import { CHECK_POSITION } from '../SelectMenu/const/selectMenuConstants';

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
  argTypes: {
    checkPosition: {
      options: CHECK_POSITION,
      controls: { type: 'inline-radio' },
      defaultValue: CHECK_POSITION[0]
    },
    option: {
      controls: { type: 'object' },
      defaultValue: {
        value: 1,
        label: 'red'
      }
    },
    wrapperClassName: {
      control: { type: 'string' },
      defaultValue: ''
    }
  },
  controls: {}
};
const Template = (args) => <SelectMenuOption {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };
