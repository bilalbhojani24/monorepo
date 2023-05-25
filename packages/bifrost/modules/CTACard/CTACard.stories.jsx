import React from 'react';
import PropTypes from 'prop-types';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import CTACardActions from '../CTACardActions';
import CTACardContent from '../CTACardContent';
import CTACardMedia from '../CTACardMedia';

import ExampleImage from './assets/ExampleImage';
import CTACard from './index';

const defaultConfig = {
  title: 'Application/Components/CTACard',
  component: CTACard,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={"import CTACard from 'bifrost/CTACard'"}
        />
      )
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/GCu9Z0GTnebRUa5nioN6Yr/branch/YLz2oAlscwfB8Y3XsRQMLg/Tailwind-UI-Library?type=design&node-id=10060%3A90391&t=WKMpnrJ0zDd2x82C-1'
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
    isDismissable: {
      control: { type: 'boolean' },
      type: { summary: 'BOOLEAN', required: false },
      description: 'Lorem Ipsum',
      defaultValue: true
    },
    wrapperClassName: {
      type: { summary: 'STRING', required: false },
      control: { type: 'text' },
      defaultValue: ''
    }
  },
  controls: {}
};
const Template = ({ header, description, ...props }) => (
  <CTACard {...props}>
    <CTACardContent header={header} description={description}>
      <CTACardActions
        primaryBtnText="Start a 14-day free trial"
        secondaryBtnText="Get a demo"
        onPrimayBtnClick={() => {
          console.log('Primary action clicked');
        }}
        onSecondaryBtnClick={() => {
          console.log('Secondary action clicked');
        }}
        primaryBtnProps={{
          colors: 'brand'
        }}
        secondaryBtnProps={{}}
      />
    </CTACardContent>
    <CTACardMedia>
      <ExampleImage className="w-full" />
    </CTACardMedia>
  </CTACard>
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

export { Primary };
