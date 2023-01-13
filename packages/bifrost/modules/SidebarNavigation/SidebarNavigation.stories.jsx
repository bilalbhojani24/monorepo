import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import {
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  UsersIcon,
} from '../Icon';
import SidebarHeader from '../SidebarHeader';
import SidebarItem from '../SidebarItem';

import SidebarNavigation from './index';

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
      page: () => (
        <DocPageTemplate
          importStatement={
            "import SidebarNavigation from 'bifrost/SidebarNavigation'"
          }
        />
      ),
    },
  },
  argTypes: {
    sidebarHeader: {
      option: { type: null },
      defaultValue: null,
    },
    sidebarPrimaryNavigation: {
      option: { type: null },
      defaultValue: null,
    },
    sidebarSecondaryNavigation: {
      option: { type: null },
      defaultValue: null,
    },
    wrapperClass: {
      options: { type: 'string' },
      defaultValue: '',
    },
  },
  controls: {},
};

const Template = (args) => <SidebarNavigation {...args} />;
const SidebarwithBrandImageTemplate = (args) => <SidebarNavigation {...args} />;
const SidebarwithSelectTemplate = (args) => <SidebarNavigation {...args} />;
const SidebarwithSecondaryNavigation = (args) => (
  <SidebarNavigation {...args} />
);

const Primary = Template.bind({});
const SidebarwithBrandImage = SidebarwithBrandImageTemplate.bind({});
const SidebarwithSelect = SidebarwithSelectTemplate.bind({});
const SidebarwithSecondary = SidebarwithSecondaryNavigation.bind({});

Primary.parameters = {
  controls: {},
};

export default defaultConfig;
export {
  Primary,
  SidebarwithBrandImage,
  SidebarwithSecondary,
  SidebarwithSelect,
};

/* ----------------------------
 * SidebarwithBrandImage
 * ----------------------------*/
const SWBHeader = (
  <SidebarHeader brandImage="https://tailwindui.com/img/logos/mark.svg" />
);

const SWBSidebarPri = (
  <>
    {primaryNavs.map((item, idx) => (
      <React.Fragment key={Math.random()}>
        <SidebarItem nav={item} current={idx === 3} />
      </React.Fragment>
    ))}
  </>
);

SidebarwithBrandImage.args = {
  sidebarHeader: SWBHeader,
  sidebarPrimaryNavigation: SWBSidebarPri,
};

/* ----------------------------
 * SidebarwithSelect
 * ----------------------------*/
const SWSHeader = <SidebarHeader dropdownOptions={selectOptions} />;

const SWSSidebarPri = (
  <>
    {primaryNavs.map((item, idx) => (
      <React.Fragment key={Math.random()}>
        <SidebarItem nav={item} current={idx === 3} />
      </React.Fragment>
    ))}
  </>
);

SidebarwithSelect.args = {
  sidebarHeader: SWSHeader,
  sidebarPrimaryNavigation: SWSSidebarPri,
};

/* ----------------------------
 * SidebarWithSecondary
 * ----------------------------*/
const SSHeader = <SidebarHeader dropdownOptions={selectOptions} />;

const SSSidebarPri = (
  <>
    {primaryNavs.map((item, idx) => (
      <React.Fragment key={Math.random()}>
        <SidebarItem nav={item} current={idx === 3} />
      </React.Fragment>
    ))}
  </>
);

const SSSidebarSec = (
  <>
    {secondaryNavs.map((item, idx) => (
      <React.Fragment key={Math.random()}>
        <SidebarItem nav={item} current={idx === 3} />
      </React.Fragment>
    ))}
  </>
);

SidebarwithSecondary.args = {
  sidebarHeader: SSHeader,
  sidebarPrimaryNavigation: SSSidebarPri,
  sidebarSecondaryNavigation: SSSidebarSec,
};
