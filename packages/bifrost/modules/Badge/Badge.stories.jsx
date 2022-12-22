import React from 'react';
import Badge from './index';
import DocPageTemplate from '../../.storybook/DocPageTemplate';
import { BADGE_SIZE, BADGE_MODIFIER } from './const/badgeConstants';

const defaultConfig = {
  title: 'Application/Components/Badge',
  component: Badge,
  parameters: {
    docs: {
      page: () => {
        return <DocPageTemplate importStatement={"import Badge from 'bifrost/Badge'"} />;
      }
    }
  },
  argTypes: {
    hasDot: {
      control: { type: 'boolean' },
      description: 'Lorem Ipsum',
      type: { summary: 'BOOLEAN', required: false },
      defaultValue: { summary: 'false' }
    },
    hasRemoveButton: {
      control: { type: 'boolean' },
      description: 'Lorem Ipsum',
      type: { summary: 'BOOLEAN', required: false },
      defaultValue: { summary: 'false' }
    },
    isRounded: {
      control: { type: 'boolean' },
      description: 'Lorem Ipsum',
      type: { summary: 'BOOLEAN', required: false },
      defaultValue: { summary: 'false' }
    },
    modifier: {
      options: BADGE_MODIFIER,
      control: { type: 'select' },
      description: 'Lorem Ipsum',
      type: { summary: 'STRING', required: false },
      defaultValue: BADGE_MODIFIER[0]
    },
    onClose: {
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
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };
