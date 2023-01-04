import React from 'react';
import Tabs from './index';
import DocPageTemplate from '../../.storybook/DocPageTemplate';
import { BuildingOfficeIcon, CreditCardIcon, UserIcon, UsersIcon } from '@heroicons/react/20/solid';
import { TAB_SHAPE } from './const/tabsConstants';

const tabs = [
  { name: 'My Account', icon: UserIcon, count: '52' },
  { name: 'Company', icon: BuildingOfficeIcon, count: '52' },
  { name: 'Team Members', icon: UsersIcon, count: '52' },
  { name: 'Billing', icon: CreditCardIcon, count: '52' },
];
const defaultConfig = {
  title: 'Application/Components/Tabs',
  component: Tabs,
  parameters: {
    docs: {
      page: () => {
        return <DocPageTemplate importStatement={"import Tabs from 'bifrost/Tabs'"} />;
      },
    },
  },
  argTypes: {
    defaultIndex: {
      type: { summary: 'NUMBER', required: false },
      description: 'ABCDEFGHIJK',
      control: { type: 'number' },
      defaultValue: 0,
    },
    id: {
      type: { summary: 'STRING', required: false },
      description: 'ABCDEFGHIJK',
      control: { type: 'text' },
      defaultValue: 'tabID',
    },
    isContained: {
      control: { type: 'boolean' },
      description: 'ABCDEFGHIJK',
      defaultValue: false,
    },
    isFullWidth: {
      control: { type: 'boolean' },
      description: 'ABCDEFGHIJK',
      defaultValue: false,
    },
    label: {
      type: { summary: 'STRING', required: false },
      description: 'ABCDEFGHIJK',
      control: { type: 'text' },
      defaultValue: 'Tabs',
    },
    onTabChange: {
      type: { summary: 'FUNCTION', required: false },
      description: 'ABCDEFGHIJK',
      control: { type: null },
      defaultValue: (current) => {
        console.log(current);
      },
    },
    shape: {
      options: TAB_SHAPE,
      control: { type: 'inline-radio' },
      defaultValue: TAB_SHAPE[0],
    },
    tabsArray: {
      description: 'Lorem Ipsum',
      type: { summary: 'BOOLEAN', required: false },
      defaultValue: tabs,
    },
  },
  controls: {},
};
const Template = (args) => <Tabs {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {},
};

export default defaultConfig;
export { Primary };
