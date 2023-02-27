import React from 'react';
import EmptyStateWStartingPoints from './index';
import DocPageTemplate from '../../.storybook/DocPageTemplate';
import { ESSP_DATA, LAYOUT_TYPES } from './const/emptyStateStaringPointConstants';

const defaultConfig = {
  title: 'Application/Components/EmptyStateWStartingPoints',
  component: EmptyStateWStartingPoints,
  parameters: {
    docs: {
      page: () => {
        return (
          <DocPageTemplate
            importStatement={"import EmptyStateWStartingPoints from 'bifrost/EmptyStateWStartingPoints'"}
          />
        );
      },
    },
  },
  argTypes: {
    ctaText: {
      option: { type: 'string' },
      defaultValue: 'Or start from an empty project',
    },
    data: {
      option: { type: null },
      defaultValue: ESSP_DATA,
    },
    handleCTAClick: {
      option: { type: null },
      defaultValue: () => {},
    },
    heading: {
      option: { type: 'string' },
      defaultValue: 'Projects',
    },
    layout: {
      options: LAYOUT_TYPES,
      defaultValue: LAYOUT_TYPES[0],
      control: { type: 'inline-radio' },
    },
    subHeading: {
      option: { type: 'string' },
      defaultValue:
        'You haven’t created a project yet. Get started by selecting a template or start from an empty project.',
    },
  },
  controls: {},
};
const Template = (args) => <EmptyStateWStartingPoints {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {},
};

export default defaultConfig;
export { Primary };
