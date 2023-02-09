import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import Hyperlink from '../Hyperlink';
import { CursorArrowRaysIcon, EnvelopeOpenIcon, UsersIcon } from '../Icon';

import { STATS_VARIANTS } from './const/statsConstants';
import Stats from './index';

const options = [
  {
    id: 1,
    name: 'Total Subscribers',
    stat: '71,897',
    icon: <UsersIcon className="h-6 w-6 text-white" />,
    change: '12%',
    previousStat: '28.62%',
    changeType: 'increase',
    link: 'google.com',
    onClick: () => console.log('stats -1')
  },
  {
    id: 2,
    name: 'Avg. Open Rate',
    stat: '58.16%',
    icon: <EnvelopeOpenIcon className="h-6 w-6 text-white" />,
    change: '5.4%',
    previousStat: '50.62%',
    changeType: 'increase',
    link: 'data.com'
  },
  {
    id: 3,
    name: 'Avg. Click Rate',
    stat: '24.57%',
    icon: <CursorArrowRaysIcon className="h-6 w-6 text-white" />,
    change: '3.2%',
    previousStat: '28.62%',
    changeType: 'decrease',
    link: 'wikipedia.com'
  }
];

const defaultConfig = {
  title: 'Application/Components/Stats',
  component: Stats,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={"import Stats from 'bifrost/Stats'"}
        />
      )
    }
  },
  argTypes: {
    textColor: {
      type: { summary: 'STRING', required: false },
      control: { type: 'text' },
      defaultValue: 'text-brand-600'
    },
    heading: {
      type: { summary: 'STRING', required: false },
      control: { type: 'text' },
      defaultValue: 'Last 30 days'
    },
    variant: {
      control: { type: 'inline-radio', required: true },
      type: {
        summary: Object.values(STATS_VARIANTS).join(', '),
        required: true
      },
      options: STATS_VARIANTS,
      description: 'Different variants',
      defaultValue: STATS_VARIANTS.WITHOUT_ICON
    },
    option: {
      defaultValue: {
        id: 1,
        name: 'Total Subscribers',
        stat: '71,897',
        icon: <UsersIcon className="h-6 w-6 text-white" />,
        change: '12%',
        previousStat: '28.62%',
        changeType: 'increase',
        link: (
          <Hyperlink
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            wrapperClassName="font-medium"
          >
            View all
            <span className="sr-only"> Total Subscriber stats</span>
          </Hyperlink>
        ),
        onClick: () => console.log('stats -1')
      }
    }
  },
  controls: {}
};
const Template = (args) => <Stats {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export const StatsWithbrandIcon = () => (
  <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
    {options.map((opt) => (
      <Stats key={opt.id} option={opt} variant={STATS_VARIANTS.WITH_ICON} />
    ))}
  </dl>
);

export const SharedBorder = () => (
  <dl className="divide-base-200 mt-5 grid grid-cols-1 divide-y overflow-hidden rounded-lg bg-white shadow md:grid-cols-3 md:divide-y-0 md:divide-x">
    {options.map((opt) => (
      <Stats
        key={opt.id}
        option={opt}
        variant={STATS_VARIANTS.WITHOUT_ICON}
        cardWrapperClassname="rounded-none"
      />
    ))}
  </dl>
);

export default defaultConfig;
export { Primary };
