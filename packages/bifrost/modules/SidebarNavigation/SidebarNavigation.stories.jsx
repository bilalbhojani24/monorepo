import React from 'react';
import { expect } from '@storybook/jest';
import { userEvent, within } from '@storybook/testing-library';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import Badge from '../Badge';
import {
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  UsersIcon
} from '../Icon';
import SelectMenu from '../SelectMenu';
import SelectMenuOptionGroup from '../SelectMenuOptionGroup';
import SelectMenuOptionItem from '../SelectMenuOptionItem';
import SelectMenuTrigger from '../SelectMenuTrigger';
import SidebarHeader from '../SidebarHeader';
import SidebarItem from '../SidebarItem';

import SidebarNavigation from './index';

const selectOptions = [
  { label: 'Project 1', value: 'p1' },
  { label: 'Project 2', value: 'p2' },
  { label: 'Project 3', value: 'p3' }
];
const primaryNavs = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    activeIcon: HomeIcon,
    inActiveIcon: HomeIcon,
    path: '/',
    badge: <Badge text="Active" />
  },
  {
    id: 'team',
    label: 'Team',
    activeIcon: UsersIcon,
    inActiveIcon: UsersIcon,
    path: '/team'
  },
  {
    id: 'project',
    label: 'Projects',
    activeIcon: FolderIcon,
    inActiveIcon: FolderIcon,
    path: '/projects',
    badge: <Badge text="Active" modifier="success" />
  },
  {
    id: 'calendar',
    label: 'Calendar',
    activeIcon: CalendarIcon,
    inActiveIcon: CalendarIcon,
    path: '/calendar'
  },
  {
    id: 'document',
    label: 'Documents',
    activeIcon: InboxIcon,
    inActiveIcon: InboxIcon,
    path: '/documents',
    childrens: [
      { id: 'document__adhar', label: 'Adhar', path: '/adhar' },
      { id: 'document__pancard', label: 'Pancard', path: '/pancard' }
    ]
  },
  {
    id: 'report',
    label: 'Reports',
    activeIcon: ChartBarIcon,
    inActiveIcon: ChartBarIcon,
    path: '/reports',
    childrens: [
      { id: 'report__finance', label: 'Finance', path: '/finance' },
      { id: 'report__team', label: 'Teams', path: '/team' }
    ]
  }
];

const secondaryNavs = [
  {
    id: 'settings',
    label: 'Settings',
    activeIcon: HomeIcon,
    inActiveIcon: HomeIcon,
    path: '/'
  },
  {
    id: 'integration',
    label: 'Integration',
    activeIcon: UsersIcon,
    inActiveIcon: UsersIcon,
    path: '/team'
  },
  {
    id: 'documentation',
    label: 'Documentation',
    activeIcon: FolderIcon,
    inActiveIcon: FolderIcon,
    path: '/projects'
  }
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
      )
    }
  },
  argTypes: {
    sidebarHeader: {
      option: { type: null },
      defaultValue: null
    },
    sidebarPrimaryNavigation: {
      option: { type: null },
      defaultValue: null
    },
    sidebarSecondaryNavigation: {
      option: { type: null },
      defaultValue: null
    },
    wrapperClassName: {
      options: { type: 'string' },
      defaultValue: ''
    }
  },
  controls: {}
};

const Template = (args) => <SidebarNavigation {...args} />;
const SidebarwithBrandImageTemplate = (args) => <SidebarNavigation {...args} />;
const SidebarwithSelectTemplate = (args) => <SidebarNavigation {...args} />;
const SidebarwithSecondaryNavigation = (args) => (
  <SidebarNavigation {...args} />
);

const Primary = Template.bind({});
const SidebarwithBrandImage = SidebarwithBrandImageTemplate.bind({});
SidebarwithBrandImage.play = async ({ canvasElement }) => {
  const sidebarItems = [
    'Dashboard',
    'Team',
    'Projects',
    'Calendar',
    'Documents',
    'Reports'
  ];
  const sidebarDocsSubItems = ['Adhar', 'Pancard'];
  const sidebarReportsSubItems = ['Finance', 'Teams'];
  const canvas = within(canvasElement);
  sidebarItems.forEach(async (item) => {
    await expect(canvas.getByText(item)).toBeVisible();
  });
  await userEvent.click(canvas.getByText('Documents'));
  sidebarDocsSubItems.forEach((subItem) => {
    expect(canvas.getByText(subItem)).toBeVisible();
  });
  await userEvent.click(canvas.getByText('Documents'));
  sidebarDocsSubItems.forEach(async (subItem) => {
    await expect(canvas.queryByText(subItem)).not.toBeVisble();
  });
  await userEvent.click(canvas.getByText('Reports'));
  sidebarReportsSubItems.forEach(async (subItem) => {
    await expect(canvas.getByText(subItem)).toBeVisble();
  });
  await userEvent.click(canvas.getByText('Reports'));
  sidebarReportsSubItems.forEach(async (subItem) => {
    await expect(canvas.queryByText(subItem)).not.toBeVisble();
  });
};

const SidebarwithSelect = SidebarwithSelectTemplate.bind({});
SidebarwithSelect.play = async ({ canvasElement }) => {
  const sleep = (ms) => new Promise((res) => setTimeout(res, ms));
  const sidebarWSecondaryItems = [
    'Dashboard',
    'Team',
    'Projects',
    'Calendar',
    'Documents',
    'Reports'
  ];
  const selectMenuItems = ['Project 1', 'Project 2', 'Project 3'];
  const sidebarDocsSubItems = ['Adhar', 'Pancard'];
  const sidebarReportsSubItems = ['Finance', 'Teams'];
  const canvas = within(canvasElement);
  sidebarWSecondaryItems.forEach(async (item) => {
    await expect(canvas.getByText(item)).toBeVisible();
  });
  await userEvent.click(canvas.getByText('Documents'));
  sidebarDocsSubItems.forEach((subItem) => {
    expect(canvas.getByText(subItem)).toBeVisible();
  });
  await userEvent.click(canvas.getByText('Documents'));
  sidebarDocsSubItems.forEach(async (subItem) => {
    console.log(canvas.queryByText(subItem));
    await expect(canvas.queryByText(subItem)).not.toBeVisble();
  });
  await userEvent.click(canvas.getByText('Reports'));
  sidebarReportsSubItems.forEach(async (subItem) => {
    await expect(canvas.getByText(subItem)).toBeVisble();
  });
  await userEvent.click(canvas.getByText('Reports'));
  sidebarReportsSubItems.forEach(async (subItem) => {
    await expect(canvas.queryByText(subItem)).not.toBeVisble();
  });
  await userEvent.click(canvas.getByText('Select..'));
  await sleep(1);
  const selectItems = document.querySelectorAll('[role="option"]');
  for (let i = 0; i < selectItems.length; i += 1) {
    expect(
      selectMenuItems.includes(selectItems[i].firstChild.textContent)
    ).toBe(true);
  }
  selectItems[0].click();
  await sleep(1);
  await expect(canvas.getByText('Project 1')).toBeInTheDocument();
};

const SidebarwithSecondary = SidebarwithSecondaryNavigation.bind({});
SidebarwithSecondary.play = async ({ canvasElement }) => {
  const sidebarWSecondaryItems = [
    'Dashboard',
    'Team',
    'Projects',
    'Calendar',
    'Documents',
    'Reports',
    'Settings',
    'Integration',
    'Documentation'
  ];
  const sidebarDocsSubItems = ['Adhar', 'Pancard'];
  const sidebarReportsSubItems = ['Finance', 'Teams'];
  const canvas = within(canvasElement);
  sidebarWSecondaryItems.forEach(async (item) => {
    await expect(canvas.getByText(item)).toBeVisible();
  });
  await userEvent.click(canvas.getByText('Documents'));
  sidebarDocsSubItems.forEach((subItem) => {
    expect(canvas.getByText(subItem)).toBeVisible();
  });
  await userEvent.click(canvas.getByText('Documents'));
  sidebarDocsSubItems.forEach(async (subItem) => {
    console.log(canvas.queryByText(subItem));
    await expect(canvas.queryByText(subItem)).not.toBeVisble();
  });
  await userEvent.click(canvas.getByText('Reports'));
  sidebarReportsSubItems.forEach(async (subItem) => {
    await expect(canvas.getByText(subItem)).toBeVisble();
  });
  await userEvent.click(canvas.getByText('Reports'));
  sidebarReportsSubItems.forEach(async (subItem) => {
    await expect(canvas.queryByText(subItem)).not.toBeVisble();
  });
};

Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export {
  Primary,
  SidebarwithBrandImage,
  SidebarwithSecondary,
  SidebarwithSelect
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
  sidebarPrimaryNavigation: SWBSidebarPri
};

/* ----------------------------
 * SidebarwithSelect
 * ----------------------------*/
const SWSHeader = (
  <SelectMenu>
    <SelectMenuTrigger placeholder="Select.." />
    <SelectMenuOptionGroup>
      {selectOptions.map((item) => (
        <SelectMenuOptionItem key={item.value} option={item} />
      ))}
    </SelectMenuOptionGroup>
  </SelectMenu>
);

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
  sidebarPrimaryNavigation: SWSSidebarPri
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
  sidebarSecondaryNavigation: SSSidebarSec
};
