import React from 'react';
import PropTypes from 'prop-types';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import FeatureFencingActions from '../FeatureFencingActions';
import { FEATURE_FENCING_ACTIONS_ALIGNMENT } from '../FeatureFencingActions/const';
import FeatureFencingContent from '../FeatureFencingContent';
import FeatureFencingMedia from '../FeatureFencingMedia';

import CSPExampleImage from './assets/CSPExampleImage';
import O11yExampleImage from './assets/O11yExampleImage';
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
const Template = ({ header, description, ...props }) => (
  <FeatureFencing {...props}>
    <FeatureFencingContent header={header} description={description}>
      <FeatureFencingActions
        primaryBtnText="Start a 14-day free trial"
        alignment="left"
        secondaryBtnText="Learn more"
        onPrimayBtnClick={() => {
          console.log('Primary action clicked');
        }}
        onSecondaryBtnClick={() => {
          console.log('Secondary action clicked');
        }}
        actionText="Successfully 14-day trial enabled"
        showActionTextOnly={false}
        primaryBtnProps={{
          colors: 'success'
        }}
      />
    </FeatureFencingContent>
    <FeatureFencingMedia>
      <O11yExampleImage />
    </FeatureFencingMedia>
  </FeatureFencing>
);

Template.propTypes = {
  header: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;

const WithSingleCTATemplate = ({ header, description, ...props }) => (
  <FeatureFencing {...props}>
    <FeatureFencingContent header={header} description={description}>
      <FeatureFencingActions
        primaryBtnText="Start a 14-day free trial"
        alignment={FEATURE_FENCING_ACTIONS_ALIGNMENT.CENTER}
        onPrimayBtnClick={() => {
          console.log('Primay action clicked');
        }}
        actionText="Successfully 14-day trial enabled"
        showActionTextOnly={false}
        primaryBtnProps={{
          colors: 'success'
        }}
      />
    </FeatureFencingContent>
    <FeatureFencingMedia>
      <CSPExampleImage />
    </FeatureFencingMedia>
  </FeatureFencing>
);

WithSingleCTATemplate.propTypes = {
  header: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

const WithSingleCTAButton = WithSingleCTATemplate.bind({});

WithSingleCTAButton.parameters = {
  controls: {}
};

WithSingleCTAButton.args = {
  // controls: {}
};

export { Primary, WithSingleCTAButton };
