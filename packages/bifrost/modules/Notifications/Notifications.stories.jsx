import React from 'react';
import Notifications from './index';
import DocPageTemplate from '../../.storybook/DocPageTemplate';
import { BUTTON_VARIANTS } from '../Button/const/buttonConstants';

const defaultConfig = {
  title: 'Application/Components/Notifications',
  component: Notifications,
  parameters: {
    docs: {
      page: () => {
        return (
          <DocPageTemplate
            importStatement={
              "import Notifications from 'bifrost/Notifications'"
            }
          />
        );
      },
    },
  },
  argTypes: {
    description: {
      option: { type: 'string' },
      defaultValue:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit oluptatum tenetur.',
    },
    isCondensed: {
      option: { type: 'boolean' },
      defaultValue: false,
    },
    handleClose: {
      option: { type: null },
      defaultValue: () => {},
    },
    negativeButtonProps: {
      type: { summary: 'OBJECT', required: false },
      control: { type: 'object' },
      defaultValue: {
        children: <>Dismiss</>,
        variant: BUTTON_VARIANTS[1],
      },
    },
    positiveButtonProps: {
      type: { summary: 'OBJECT', required: false },
      control: { type: 'object' },
      defaultValue: {
        children: <>Undo</>,
        variant: BUTTON_VARIANTS[0],
      },
    },
    NotificationIcon: {},
    NotificationIconClassName: { option: { type: 'string' }, defaultValue: '' },
    title: { option: { type: 'string' }, defaultValue: 'Discussion moved' },
    show: {
      control: { type: 'boolean' },
      defaultValue: true,
    },
  },
  controls: {},
};
const Template = (args) => <Notifications {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {},
};

export default defaultConfig;
export { Primary };
