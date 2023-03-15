import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';

import { BADGE_MODIFIER, BADGE_SIZE } from './const/badgeConstants';
import Badge from './index';

const defaultConfig = {
  title: 'Application/Components/Badge',
  component: Badge,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={"import Badge from 'bifrost/Badge'"}
        />
      )
    }
  },
  argTypes: {
    hasDot: {
      control: { type: 'boolean' },
      description: 'Shows dot on left hand side',
      type: { summary: 'BOOLEAN', required: false },
      defaultValue: { summary: 'false' }
    },
    hasRemoveButton: {
      control: { type: 'boolean' },
      description: 'Cross icon on right hand side',
      type: { summary: 'BOOLEAN', required: false },
      defaultValue: { summary: 'false' }
    },
    isRounded: {
      control: { type: 'boolean' },
      description: 'Lorem',
      type: { summary: 'BOOLEAN', required: false },
      defaultValue: { summary: 'false' }
    },
    modifier: {
      options: BADGE_MODIFIER,
      control: { type: 'select' },
      description: 'Ipsum',
      type: { summary: 'STRING', required: false },
      defaultValue: BADGE_MODIFIER[0]
    },
    onClose: {
      control: { type: null },
      description: 'Lorem',
      type: { summary: 'FUNCTION', required: false }
    },
    onClick: {
      control: { type: null },
      description: 'Lorem Ipsum',
      type: { summary: 'FUNCTION', required: false }
    },
    size: {
      options: BADGE_SIZE,
      control: { type: 'select' },
      description: 'Lorem Ipsum',
      type: { summary: 'BOOLEAN', required: false },
      defaultValue: BADGE_SIZE[0]
    },
    text: {
      type: { summary: 'STRING', required: false },
      description: 'ABCDEFGHIJK',
      control: { type: 'text' },
      defaultValue: 'Badge'
    }
  },
  controls: {
    onClose: {}
  }
};
const Template = (args) => <Badge {...args} />;
const Primary = Template.bind({});
const DisabledBage = Template.bind({});

Primary.parameters = {
  controls: {}
};
DisabledBage.args = {
  disabled: true
};

export default defaultConfig;
export { DisabledBage, Primary };
