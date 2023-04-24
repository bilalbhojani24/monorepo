import React from 'react';
import { getLocalTimeZone, today } from '@internationalized/date';

import DocPageTemplate from '../../.storybook/DocPageTemplate';

import DateRangepicker from './index';

const defaultConfig = {
  title: 'Application/Components/DateRangepicker',
  component: DateRangepicker,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={
            "import DateRangepicker from 'bifrost/DateRangepicker'"
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
    onChange: {
      defaultValue: () => {}
    },
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
const Template = (args) => (
  <DateRangepicker
    minValue={today(getLocalTimeZone()).subtract({ years: 2 })}
    maxValue={today(getLocalTimeZone()).add({ days: 3 })}
    {...args}
  />
);
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };
