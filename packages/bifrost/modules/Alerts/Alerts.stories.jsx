import React from 'react';
import { expect } from '@storybook/jest';
import { userEvent, within } from '@storybook/testing-library';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import AutomationIcon from '../Icon/CustomIcons/AutomationIcon';

import { ALERT_LINK_POSITION, ALERT_MODIFIER } from './const/alertConstants';
import Alerts from './index';

const attentionNeeded = 'Attention needed';
const defaultConfig = {
  title: 'Application/Components/Alerts',
  component: Alerts,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={"import Alerts from 'bifrost/Alerts'"}
        />
      )
    },
    design: {
      type: 'figma',
      url: ''
    }
  },
  argTypes: {
    alertIcon: {
      control: { type: null },
      defaultValue: null
    },
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
      description:
        "Renders a string if 'String' is passed as prop, renders a list if 'String[]' is passed. It should also be noted that 'title' prop should be a valid String if passing a 'String[]' as 'description' prop.",
      defaultValue:
        'A new software update is available. See what’s new in version 2.0.4.5.'
    },
    modifier: {
      options: ALERT_MODIFIER,
      control: { type: 'select' },
      description: 'Convey meaning through modifier types',
      type: { summary: 'STRING', required: false },
      defaultValue: ALERT_MODIFIER[0]
    },
    title: {
      control: { type: 'text' },
      type: { summary: 'TEXT', required: false },
      description:
        "Renders title of the alert component, while passing title prop make sure 'dismissButton' prop is not enabled.",
      defaultValue: attentionNeeded
    },
    enableActions: {
      option: { type: 'boolean' },
      defaultValue: false
    },
    alphaActionFn: {
      option: { type: null },
      defaultValue: () => {
        console.log('perform alpha fn');
      }
    },
    betaActionFn: {
      option: { type: null },
      defaultValue: () => {
        console.log('perform beta fn');
      }
    },
    alphaActionTitle: {
      option: { type: 'string' },
      defaultValue: 'View Status'
    },
    betaActionTitle: {
      option: { type: 'string' },
      defaultValue: 'Dismiss'
    },
    dismissButton: {
      option: { type: 'boolean' },
      defaultValue: false
    },
    dismissButtonFn: {
      option: { type: null },
      defaultValue: () => {
        console.log('perform dismiss button fn');
      }
    }
  },
  controls: {}
};
const Template = (args) => <Alerts {...args} />;
const CustomIconTemplate = (args) => <Alerts {...args} />;

const Primary = Template.bind({});
Primary.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await expect(canvas.getByText(attentionNeeded)).toBeVisible();
  await userEvent.click(canvas.getByText('Details'));
};

const CustomIcon = CustomIconTemplate.bind({});
CustomIcon.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await expect(canvas.getByText(attentionNeeded)).toBeVisible();
  await userEvent.click(canvas.getByText('Details'));
};

Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { CustomIcon, Primary };

CustomIcon.args = {
  alertIcon: <AutomationIcon iconClass="h-5 w-5" />
};
