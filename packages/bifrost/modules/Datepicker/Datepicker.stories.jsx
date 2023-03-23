import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import DatepickerLabel from '../DatepickerLabel';

import Datepicker from './index';

const defaultConfig = {
  title: 'Application/Components/Datepicker',
  component: Datepicker,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={"import Datepicker from 'bifrost/Datepicker'"}
        />
      )
    }
  },
  argTypes: {
    label: {
      defaultValue: 'Due Date'
    },
    onChange: {
      defaultValue: () => {}
    },
    value: {}
  },
  controls: {}
};
const Template = (args) => {
  const { label } = args;
  return (
    <>
      <DatepickerLabel>{label}</DatepickerLabel>
      <Datepicker {...args} />
    </>
  );
};

const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };
