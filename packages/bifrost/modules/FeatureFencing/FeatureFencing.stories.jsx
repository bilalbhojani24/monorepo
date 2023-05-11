import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import FeatureFencingActions from '../FeatureFencingActions';
import FeatureFencingContent from '../FeatureFencingContent';
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
const Template = (props) => (
  <FeatureFencing {...props}>
    <FeatureFencingMedia>
      <img
        className="w-full"
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg"
        alt="Grapefruit slice atop a pile of other slices"
      />
    </FeatureFencingMedia>
    <FeatureFencingContent {...props}>
      <FeatureFencingActions
        primaryBtnText="Start a 14-day free trial"
        alignment="left"
        secondaryBtnText="Learn more"
        onPrimayBtnClick={() => {
          console.log('ff-actions-cta-clicked');
        }}
        onSecondaryBtnClick={() => {
          console.log('ff-actions-learn-more-clicked');
        }}
        actionText="Successfully achieved more things"
        showActionTextOnly={false}
      />
    </FeatureFencingContent>
  </FeatureFencing>
);
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };
