import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import { CHECK_POSITION } from '../ComboBox/const/comboBoxConstants';

import ComboboxOptions from './index';

const defaultConfig = {
  title: 'Application/Components/ComboboxOptions',
  component: ComboboxOptions,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={
            "import ComboboxOptions from 'bifrost/ComboboxOptions'"
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
const Template = (args) => <ComboboxOptions {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };
