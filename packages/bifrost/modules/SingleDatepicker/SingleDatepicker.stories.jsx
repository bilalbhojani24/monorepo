import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';

import SingleDatepicker from './index';

const defaultConfig = {
  title: 'Application/Components/SingleDatepicker',
  component: SingleDatepicker,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={
            "import SingleDatepicker from 'bifrost/SingleDatepicker'"
          }
        />
      )
    }
  },
  argTypes: {
    errorMessage: {
      defaultValue: ''
    },
    disabled: {
      defaultValue: false
    },
    disabledMessage: {
      defaultValue: 'Datepicker has been disabled'
    },
    onChange: {},
    offset: {
      defaultValue: 0
    },
    crossOffset: {
      defaultValue: 0
    },
    placement: {
      defaultValue: 'bottom end'
    },
    label: {
      defaultValue: 'Sometimes'
    }
  },
  controls: {}
};
const Template = (args) => <SingleDatepicker {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };
