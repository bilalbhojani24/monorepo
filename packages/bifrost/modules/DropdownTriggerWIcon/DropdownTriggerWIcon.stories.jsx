import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';

import { DROPDOWN_TRIGGER_TYPES } from './const/DropdownTriggerWIconConst';
import DropdownTriggerWIcon from './index';

const defaultConfig = {
  title: 'Application/Components/DropdownTriggerWIcon',
  component: DropdownTriggerWIcon,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={
            "import DropdownTriggerWIcon from 'bifrost/DropdownTriggerWIcon'"
          }
        />
      )
    }
  },
  argTypes: {
    wrapperClassName: {
      control: { type: 'text' },
      type: { summary: 'TEXT', required: false },
      description: 'Classes to be passed to base component'
    },
    variant: {
      control: { type: 'inline-radio' },
      type: { summary: DROPDOWN_TRIGGER_TYPES.join(', '), required: false },
      options: DROPDOWN_TRIGGER_TYPES,
      description: 'Lorem'
    },
    icon: {
      defaultValue: null
    }
  },
  controls: {}
};
const MeatBallTemplate = (args) => <DropdownTriggerWIcon {...args} />;
const MeatBall = MeatBallTemplate.bind({});
MeatBall.parameters = {
  controls: {}
};

MeatBall.args = {
  variant: DROPDOWN_TRIGGER_TYPES[0]
};

const MenuTemplate = (args) => <DropdownTriggerWIcon {...args} />;
const Menu = MenuTemplate.bind({});
Menu.parameters = {
  controls: {}
};

Menu.args = {
  variant: DROPDOWN_TRIGGER_TYPES[1]
};

export default defaultConfig;
export { MeatBall, Menu };
