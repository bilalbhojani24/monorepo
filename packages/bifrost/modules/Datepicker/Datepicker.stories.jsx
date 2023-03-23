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
    errorMessage: {
      defaultValue: ''
    },
    disabled: {
      defaultValue: false
    },
    disabledMessage: {
      defaultValue: 'Datepicker has been disabled'
    }
  },
  controls: {}
};

const DatepickerWithLabelT = (args) => (
  <>
    <DatepickerLabel wrapperClassName="mb-1">Due Date</DatepickerLabel>
    <Datepicker {...args} />
  </>
);

const DatepickerWithLabel = DatepickerWithLabelT.bind({});
DatepickerWithLabel.parameters = {
  controls: {}
};

const DatepickerWithoutLabelT = (args) => <Datepicker {...args} />;

const DatepickerWithoutLabel = DatepickerWithoutLabelT.bind({});
DatepickerWithoutLabel.parameters = {
  controls: {}
};

export default defaultConfig;
export { DatepickerWithLabel, DatepickerWithoutLabel };
