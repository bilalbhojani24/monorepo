import React from 'react';
import Notifications from './index';
import DocPageTemplate from '../../.storybook/DocPageTemplate';

const defaultConfig = {
  title: 'Application/Components/Notifications',
  component: Notifications,
  parameters: {
    docs: {
      page: () => {
        return <DocPageTemplate importStatement={"import Notifications from 'bifrost/Notifications'"} />;
      }
    }
  },
  argTypes: {
    description: {
      option: { type: 'string' },
      defaultValue: 'Lorem ipsum dolor sit amet consectetur adipisicing elit oluptatum tenetur.'
    },
    handleClose: {
      option: { type: null },
      defaultValue: () => {}
    },
    handleNegativeButton: {
      option: { type: null },
      defaultValue: () => {}
    },
    handlePositiveButton: {
      option: { type: null },
      defaultValue: () => {}
    },
    negativeButtonLabel: { option: { type: 'string' }, defaultValue: 'Dismiss' },
    NotificationIcon: {},
    NotificationIconClassName: { option: { type: 'string' }, defaultValue: '' },
    positiveButtonLabel: { option: { type: 'string' }, defaultValue: 'Undo' },
    title: { option: { type: 'string' }, defaultValue: 'Discussion moved' },
    show: {
      control: { type: 'boolean' },
      defaultValue: true
    }
  },
  controls: {}
};
const Template = (args) => <Notifications {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };
