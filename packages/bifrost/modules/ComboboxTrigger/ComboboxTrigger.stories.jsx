import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';

import ComboboxTrigger from './index';

const defaultConfig = {
  title: 'Application/Components/ComboboxTrigger',
  component: ComboboxTrigger,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={
            "import ComboboxTrigger from 'bifrost/ComboboxTrigger'"
          }
        />
      )
    }
  },
  argTypes: {
    onInputValueChange: {
      option: { type: null },
      defaultValue: (e) => console.log(e.target.value)
    },
    placeholder: {
      option: { type: 'string' },
      defaultValue: 'Placeholder...'
    }
  },
  controls: {}
};
const Template = (args) => <ComboboxTrigger {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };
