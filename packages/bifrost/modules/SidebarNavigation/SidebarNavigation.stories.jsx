import React from 'react';
import SidebarNavigation from './index';
import DocPageTemplate from '../../.storybook/DocPageTemplate';
import { CalendarIcon, ChartBarIcon, FolderIcon, HomeIcon, InboxIcon, UsersIcon } from '../Icon';

const selectOptions = [
  { label: 'Project 1', value: 'p1' },
  { label: 'Project 2', value: 'p2' },
  { label: 'Project 3', value: 'p3' },
];

const primaryNavs = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    activeIcon: HomeIcon,
    inActiveIcon: HomeIcon,
    path: '/',
    badgeLabel: 'Active',
  },
  {
    id: 'team',
    label: 'Team',
    activeIcon: UsersIcon,
    inActiveIcon: UsersIcon,
    path: '/team',
  },
  {
    id: 'project',
    label: 'Projects',
    activeIcon: FolderIcon,
    inActiveIcon: FolderIcon,
    path: '/projects',
    badgeLabel: 'Active',
  },
  {
    id: 'calendar',
    label: 'Calendar',
    activeIcon: CalendarIcon,
    inActiveIcon: CalendarIcon,
    path: '/calendar',
  },
  {
    id: 'document',
    label: 'Documents',
    activeIcon: InboxIcon,
    inActiveIcon: InboxIcon,
    path: '/documents',
    childrens: [
      { id: 'document__adhar', label: 'Adhar', path: '/adhar' },
      { id: 'document__pancard', label: 'Pancard', path: '/pancard' },
    ],
  },
  {
    id: 'report',
    label: 'Reports',
    activeIcon: ChartBarIcon,
    inActiveIcon: ChartBarIcon,
    path: '/reports',
    childrens: [
      { id: 'report__finance', label: 'Finance', path: '/finance' },
      { id: 'report__team', label: 'Team', path: '/team' },
    ],
  },
];

const secondaryNavs = [
  {
    id: 'settings',
    label: 'Settings',
    activeIcon: HomeIcon,
    inActiveIcon: HomeIcon,
    path: '/',
  },
  {
    id: 'integration',
    label: 'Integration',
    activeIcon: UsersIcon,
    inActiveIcon: UsersIcon,
    path: '/team',
  },
  {
    id: 'documentation',
    label: 'Documentation',
    activeIcon: FolderIcon,
    inActiveIcon: FolderIcon,
    path: '/projects',
  },
];

const defaultConfig = {
  title: 'Application/Components/SidebarNavigation',
  component: SidebarNavigation,
  parameters: {
    docs: {
      page: () => {
        return <DocPageTemplate importStatement={"import SidebarNavigation from 'bifrost/SidebarNavigation'"} />;
      },
    },
  },
  argTypes: {
    activeClass: {
      options: { type: 'string' },
      defaultValue: '',
    },
    activeIconClass: {
      options: { type: 'string' },
      defaultValue: '',
    },
    brandImage: {
      options: { type: 'string' },
      defaultValue: 'https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600',
    },
    brandImageContainerClass: {
      options: { type: 'string' },
      defaultValue: '',
    },
    brandImageClass: {
      options: { type: 'string' },
      defaultValue: '',
    },
    handleClick: {
      options: { type: null },
      defaultValue: (currentItem, parentItem) => {
        console.log(currentItem);
        console.log(parentItem);
      },
    },
    inActiveClass: {
      options: { type: 'string' },
      defaultValue: '',
    },
    inActiveIconClass: {
      options: { type: 'string' },
      defaultValue: '',
    },
    primaryNavItems: {
      options: { type: null },
      defaultValue: primaryNavs,
    },
    secondaryNavItems: {
      options: { type: null },
      defaultValue: secondaryNavs,
    },
    selectOptions: {
      options: { typee: null },
      defaultValue: selectOptions,
    },
    withSelect: {
      options: { typee: 'boolean' },
      defaultValue: false,
    },
    wrapperClass: {
      options: { type: 'string' },
      defaultValue: '',
    },
  },
  controls: {},
};
const Template = (args) => <SidebarNavigation {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {},
};

export default defaultConfig;
export { Primary };
