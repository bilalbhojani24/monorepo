import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';

import ComboboxLabel from './index';

const defaultConfig = {
  title: 'Application/Components/ComboboxLabel',
  component: ComboboxLabel,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={"import ComboboxLabel from 'bifrost/ComboboxLabel'"}
        />
      )
    }
  },
  argTypes: {
    children: {
      control: { type: null },
      defaultValue: 'Assigned to'
    },
    wrapperClassName: {
      control: { type: 'string' },
      defaultValue: ''
    }
  },
  controls: {}
};
const Template = (args) => <ComboboxLabel {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };
