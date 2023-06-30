import React from 'react';
import { getLocalTimeZone, parseDate, today } from '@internationalized/date';

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
    },
    isLoading: {
      defaultValue: false
    }
  },
  controls: {}
};
const Template = (args) => (
  <DateRangepicker
    minValue={today(getLocalTimeZone()).subtract({ years: 2 })}
    maxValue={today(getLocalTimeZone()).add({ years: 2 })}
    {...args}
  />
);

export const DateRangeWDefaultValue = () => (
  <DateRangepicker
    label="Date range"
    defaultValue={{
      start: parseDate('2022-02-03'),
      end: parseDate('2022-05-03')
    }}
  />
);

export const DateRangeWCustomZindex = (args) => (
  <>
    <p>
      The datepicker content popover(items inside the dropdown) can be restyled
      using the <code>popoverWrapperClassName</code>, it is also important to
      note certain styles such as z index can not be updated when the popover is
      visible.
    </p>
    <p className="my-3">
      Here we are using the z index of 40 to showcase custom styles being
      applied.
    </p>
    <DateRangepicker {...args} popoverWrapperClassName="z-40" />
  </>
);

const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };
