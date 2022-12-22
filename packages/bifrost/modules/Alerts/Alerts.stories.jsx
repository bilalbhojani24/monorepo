import React from 'react';
import Alerts from './index';
import DocPageTemplate from '../../.storybook/DocPageTemplate';
import { ALERT_LINK_POSITION, ALERT_MODIFIER } from './const/alertConstants';
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
    linkText: { option: { type: 'string' }, defaultValue: 'Details' },
    linkUrl: { option: { type: 'string' }, defaultValue: '/' },
    show: {
      control: { type: 'boolean' },
      defaultValue: true
    },
    description: {
      option: { type: 'string' },
      description: "Render a text or list based upon type of input",
      defaultValue: 'A new software update is available. See what’s new in version 2.0.4.5.'
    },
    modifier: {
      options: ALERT_MODIFIER,
      control: { type: "select" },
      description: "Convey meaning through modifier types",
      type: { summary: "STRING", required: false },
      defaultValue: ALERT_MODIFIER[0],
    },
    title: {
      option: { type: 'string' },
      defaultValue: 'Attention needed'
    },
    enableActions: {
      option: {type: "boolean"}, 
      defaultValue: false
    },
    alphaActionFn: {
      option: { type: null },
      defaultValue: () => {
        console.log('perform alpha action');
      }
    },
    betaActionFn: {
      option: { type: null },
      defaultValue: () => {
        console.log('perform beta action');
      }
    },
    alphaActionTitle: {
      option: { type: 'string' },
      defaultValue: "View Status"
    },
    betaActionTitle: {
      option: { type: 'string' },
      defaultValue: "Dismiss"
    },
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
