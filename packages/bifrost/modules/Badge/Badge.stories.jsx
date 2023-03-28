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
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/GCu9Z0GTnebRUa5nioN6Yr/Tailwind-UI-Library?node-id=131-34920&t=TWCLo3KWhysdxj9F-0'
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
const DisabledBadge = Template.bind({});

Primary.parameters = {
  controls: {}
};
DisabledBadge.args = {
  disabled: true
};

export default defaultConfig;
export { DisabledBadge, Primary };
