import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';

import ComboboxOptionsBox from './index';

const defaultConfig = {
  title: 'Application/Components/ComboboxOptionsBox',
  component: ComboboxOptionsBox,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={
            "import ComboboxOptionsBox from 'bifrost/ComboboxOptionsBox'"
          }
        />
      )
    }
  },
  argTypes: {
    children: {
      option: { type: 'string' },
      defaultValue: <></>
    },
    wrapperClassName: {
      control: { type: 'string' },
      defaultValue: ''
    }
  },
  controls: {}
};
const Template = (args) => <ComboboxOptionsBox {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };
