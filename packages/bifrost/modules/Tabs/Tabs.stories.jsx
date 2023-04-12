import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import {
  BuildingOfficeIcon,
  CreditCardIcon,
  UserIcon,
  UsersIcon
} from '../Icon';

import { TAB_SHAPE } from './const/tabsConstants';
import Tabs from './index';

const tabs = [
  { name: 'My Account', icon: UserIcon, count: '52' },
  { name: 'Company', icon: BuildingOfficeIcon, count: '52' },
  { name: 'Team Members', icon: UsersIcon, count: '52' },
  { name: 'Billing', icon: CreditCardIcon, count: '52' }
];

const defaultConfig = {
  title: 'Application/Components/Tabs',
  component: Tabs,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate importStatement={"import Tabs from 'bifrost/Tabs'"} />
      )
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/GCu9Z0GTnebRUa5nioN6Yr/Tailwind-UI-Library?node-id=178-38522&t=TWCLo3KWhysdxj9F-0'
    }
  },
  argTypes: {
    defaultIndex: {
      type: { summary: 'NUMBER', required: false },
      description: 'ABCDEFGHIJK',
      control: { type: 'number' },
      defaultValue: 0
    },
    id: {
      type: { summary: 'STRING', required: false },
      description: 'ABCDEFGHIJK',
      control: { type: 'text' },
      defaultValue: 'tabID'
    },
    isContained: {
      control: { type: 'boolean' },
      description: 'ABCDEFGHIJK',
      defaultValue: false
    },
    isFullWidth: {
      control: { type: 'boolean' },
      description: 'ABCDEFGHIJK',
      defaultValue: false
    },
    label: {
      type: { summary: 'STRING', required: false },
      description: 'ABCDEFGHIJK',
      control: { type: 'text' },
      defaultValue: 'Tabs'
    },
    onTabChange: {
      type: { summary: 'FUNCTION', required: false },
      description: 'ABCDEFGHIJK',
      control: { type: null },
      defaultValue: (current) => {
        console.log(current);
      }
    },
    shape: {
      options: TAB_SHAPE,
      control: { type: 'inline-radio' },
      defaultValue: TAB_SHAPE[0]
    },
    tabsArray: {
      description: 'Lorem Ipsum',
      type: { summary: 'BOOLEAN', required: false },
      defaultValue: tabs
    }
  },
  controls: {}
};
const Template = (args) => <Tabs {...args} />;

const Primary = Template.bind({});

Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };

const slidableTabs = [
  { name: 'My Account', icon: UserIcon, count: '52' },
  { name: 'Company', icon: BuildingOfficeIcon, count: '52' },
  { name: 'Team Members', icon: UsersIcon, count: '52' },
  { name: 'Billing 1', icon: CreditCardIcon, count: '52' },
  { name: 'Billing 2', icon: CreditCardIcon, count: '52' },
  { name: 'Billing 3', icon: CreditCardIcon, count: '52' },
  { name: 'Billing 4', icon: CreditCardIcon, count: '52' },
  { name: 'Billing 5', icon: CreditCardIcon, count: '52' },
  { name: 'Billing 6', icon: CreditCardIcon, count: '52' },
  { name: 'Billing 7', icon: CreditCardIcon, count: '52' },
  { name: 'Billing 8', icon: CreditCardIcon, count: '52' },
  { name: 'Billing 9', icon: CreditCardIcon, count: '52' },
  { name: 'Billing 10', icon: CreditCardIcon, count: '52' },
  { name: 'Billing 11', icon: CreditCardIcon, count: '52' },
  { name: 'Billing 12', icon: CreditCardIcon, count: '52' }
];

export const SlidableTabs = () => (
  <>
    <Tabs tabsArray={slidableTabs} isSlideableTabs />
  </>
);
