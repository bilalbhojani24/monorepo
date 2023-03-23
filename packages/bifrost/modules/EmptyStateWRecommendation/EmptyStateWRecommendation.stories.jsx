import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';

import {
  ESR_DATA,
  LAYOUT_TYPES
} from './const/emptyStateRecommendationConstants';
import EmptyStateWRecommendation from './index';

const defaultConfig = {
  title: 'Application/Components/EmptyStateWRecommendation',
  component: EmptyStateWRecommendation,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={
            "import EmptyStateWRecommendation from 'bifrost/EmptyStateWRecommendation'"
          }
        />
      )
    },
    design: {
      type: 'figma',
      url: ''
    }
  },
  argTypes: {
    buttonLabel: {
      option: { type: 'string' },
      defaultValue: 'Send invite'
    },
    data: {
      option: { type: null },
      defaultValue: ESR_DATA
    },
    heading: {
      option: { type: 'string' },
      defaultValue: 'Add team members'
    },
    recommendationTitle: {
      option: { type: 'string' },
      defaultValue: 'Recommended team members'
    },
    layout: {
      options: LAYOUT_TYPES,
      defaultValue: LAYOUT_TYPES[0],
      control: { type: 'inline-radio' }
    },
    subHeading: {
      option: { type: 'string' },
      defaultValue:
        'You haven’t added any team members to your project yet. As the owner of this project, you can manage team member permissions.'
    },
    wrapperClassName: {
      option: { type: 'string' },
      defaultValue: 'max-w-md sm:max-w-3xl'
    }
  },
  controls: {}
};
const Template = (args) => <EmptyStateWRecommendation {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };
