import React from 'react';
import Stats from './index';
import DocPageTemplate from '../../.storybook/DocPageTemplate';
import { STATS_SPACING } from './const/statsConstants';

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
        description: 'ABCDEFGHIJK',
        control: { type: 'text' },
        defaultValue: 'text-indigo-600'
    }
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
