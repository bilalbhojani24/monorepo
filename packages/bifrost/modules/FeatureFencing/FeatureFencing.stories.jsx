import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import Button from '../Button';
import FeatureFencingActions from '../FeatureFencingActions';
import FeatureFencingMedia from '../FeatureFencingMedia';

import { FEATURE_FENCING_SIZES } from './const';
import FeatureFencing from './index';

const defaultConfig = {
  title: 'Application/Components/FeatureFencing',
  component: FeatureFencing,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={
            "import FeatureFencing from 'bifrost/FeatureFencing'"
          }
        />
      )
    }
  },
  argTypes: {
    children: {
      option: { type: 'string' },
      defaultValue: (
        <>
          <FeatureFencingActions wrapperClassName="">
            <Button
              onClick={() => {}}
              wrapperClassName=""
              variant=""
              colors=""
              size="default"
            >
              Get a 14-day free trial
            </Button>
          </FeatureFencingActions>
          <FeatureFencingMedia>Media component</FeatureFencingMedia>
        </>
      )
    },
    header: {
      type: { summary: 'STRING', required: false },
      description: 'Header',
      control: { type: 'text' },
      defaultValue: 'Monitor and take action on alerts'
    },
    description: {
      type: { summary: 'STRING', required: false },
      description: 'Description',
      control: { type: 'text' },
      defaultValue: `Keep critical changes on your radar to avoid crisis scenarios. Create alerts that use index- and metric-based thresholds to send emails.`
    },
    size: {
      control: { type: 'inline-radio' },
      type: {
        summary: Object.values(FEATURE_FENCING_SIZES).join(', '),
        required: false
      },
      options: Object.values(FEATURE_FENCING_SIZES),
      description: 'Size',
      defaultValue: FEATURE_FENCING_SIZES.BASE
    },
    isDismissable: {
      control: { type: 'boolean' },
      type: { summary: 'BOOLEAN', required: false },
      description: 'Lorem Ipsum'
    }
  },
  controls: {}
};
const Template = (args) => <FeatureFencing {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };
