import React from 'react';
import Stats from './index';
import DocPageTemplate from '../../.storybook/DocPageTemplate';
import { STATS_SPACING } from './const/statsConstants';
import { CursorArrowRaysIcon, EnvelopeOpenIcon, UsersIcon } from '../Icon';

const defaultConfig = {
  title: 'Application/Components/Stats',
  component: Stats,
  parameters: {
    docs: {
      page: () => {
        return <DocPageTemplate importStatement={"import Stats from 'bifrost/Stats'"} />;
      },
    },
  },
  argTypes: {
    spacing: {
      options: STATS_SPACING,
      control: { type: 'select' },
      description: 'Keep the stats cards spaced between or clubbed together with border',
      type: { summary: 'BOOLEAN', required: false },
      defaultValue: STATS_SPACING[0],
    },
    textColor: {
      type: { summary: 'STRING', required: false },
      control: { type: 'text' },
      defaultValue: 'text-brand-600',
    },
    heading: {
        type: { summary: 'STRING', required: false },
        control: { type: 'text' },
        defaultValue: 'Last 30 days',
    },
    badge: {
        type: { summary: 'BOOLEAN', required: false },
        defaultValue: false,
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
          link: 'google.com',
        },
        {
          id: 2,
          name: 'Avg. Open Rate',
          stat: '58.16%',
          icon: EnvelopeOpenIcon,
          change: '5.4%',
          previousStat: '50.62%',
          changeType: 'increase',
          link: 'google.com',
        },
        {
          id: 3,
          name: 'Avg. Click Rate',
          stat: '24.57%',
          icon: CursorArrowRaysIcon,
          change: '3.2%',
          previousStat: '28.62%',
          changeType: 'decrease',
          link: 'google.com',
        },
      ],
    },
  },
  controls: {},
};
const Template = (args) => <Stats {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {},
};

export default defaultConfig;
export { Primary };
