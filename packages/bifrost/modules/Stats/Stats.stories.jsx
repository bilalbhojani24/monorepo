import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import { CursorArrowRaysIcon, EnvelopeOpenIcon, UsersIcon } from '../Icon';

import { STATS_SPACING, STATS_VARIANTS } from './const/statsConstants';
import Stats from './index';

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
    spacing: {
      options: STATS_SPACING,
      control: { type: 'select' },
      description:
        'Keep the stats cards spaced between or clubbed together with border',
      type: { summary: 'BOOLEAN', required: false },
      defaultValue: STATS_SPACING[0]
    },
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
    options: {
      defaultValue: [
        {
          id: 1,
          name: 'Total Subscribers',
          stat: '71,897',
          icon: UsersIcon,
          change: '12%',
          previousStat: '28.62%',
          changeType: 'increase',
          link: 'google.com'
        },
        {
          id: 2,
          name: 'Avg. Open Rate',
          stat: '58.16%',
          icon: EnvelopeOpenIcon,
          change: '5.4%',
          previousStat: '50.62%',
          changeType: 'increase',
          link: 'data.com'
        },
        {
          id: 3,
          name: 'Avg. Click Rate',
          stat: '24.57%',
          icon: CursorArrowRaysIcon,
          change: '3.2%',
          previousStat: '28.62%',
          changeType: 'decrease',
          link: 'wikipedia.com'
        }
      ]
    }
  },
  controls: {}
};
const Template = (args) => <Stats {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };
