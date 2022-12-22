import React from 'react';
import Alerts from './index';
import DocPageTemplate from '../../.storybook/DocPageTemplate';
import { ALERT_LINK_POSITION } from './const/alertConstants';
import { InformationCircleIcon } from '../Icon';

const defaultConfig = {
  title: 'Application/Components/Alerts',
  component: Alerts,
  parameters: {
    docs: {
      page: () => {
        return <DocPageTemplate importStatement={"import Alerts from 'bifrost/Alerts'"} />;
      }
    }
  },
  argTypes: {
    accentBorder: {
      control: { type: 'boolean' },
      defaultValue: true
    },
    AlertIcon: {
      control: { type: null },
      defaultValue: InformationCircleIcon
    },
    alertIconClassName: { option: { type: 'string' }, defaultValue: 'text-yellow-400' },
    alertLinkPosition: {
      options: Object.values(ALERT_LINK_POSITION),
      control: { type: 'inline-radio' },
      defaultValue: ALERT_LINK_POSITION[1]
    },
    handleLinkClick: {
      option: { type: null },
      defaultValue: (url) => {
        console.log(url);
      }
    },
    linkClass: { option: { type: 'string' }, defaultValue: 'text-yellow-700 hover:text-yellow-600' },
    linkText: { option: { type: 'string' }, defaultValue: 'Details' },
    linkUrl: { option: { type: 'string' }, defaultValue: '/' },
    show: {
      control: { type: 'boolean' },
      defaultValue: true
    },
    text: {
      option: { type: 'string' },
      defaultValue: 'A new software update is available. See what’s new in version 2.0.4.'
    },
    textColorClass: {
      option: { type: 'string' },
      defaultValue: 'text-yellow-700'
    },
    wrapperClass: {
      option: { type: 'string' },
      defaultValue: 'border-yellow-400 bg-yellow-50'
    }
  },
  controls: {}
};
const Template = (args) => <Alerts {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };
