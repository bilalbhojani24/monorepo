import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import { CalendarIcon, FolderIcon, HomeIcon, UsersIcon } from '../Icon';

import SidebarNavigationWCollapse from './index';

const primaryNavs = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <HomeIcon className="text-base-500 h-6 w-6" />,
    active: true
  },
  {
    id: 'team',
    label: 'Team',
    icon: <UsersIcon className="text-base-500 h-6 w-6" />
  },
  {
    id: 'project',
    label: 'Projects',
    icon: <FolderIcon className="text-base-500 h-6 w-6" />
  },
  {
    id: 'calendar',
    label: 'Calendar',
    icon: <CalendarIcon className="text-base-500 h-6 w-6" />
  }
];

const secondaryNavs = [
  {
    id: 'johndoe',
    label: 'John Doe',
    icon: <HomeIcon className="text-base-500 h-6 w-6" />
  }
];

const defaultConfig = {
  title: 'Application/Components/SidebarNavigationWCollapse',
  component: SidebarNavigationWCollapse,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={
            "import SidebarNavigationWCollapse from 'bifrost/SidebarNavigationWCollapse'"
          }
        />
      )
    }
  },
  argTypes: {
    collapsedCutoff: {
      control: { type: 'number' },
      type: { summary: 'NUMBER', required: false },
      description: 'Cutoff value in pixels to trigger collapsed sidebar',
      defaultValue: 900
    },
    wrapperClassName: {
      control: { type: 'text' },
      type: { summary: 'TEXT', required: false },
      description: 'Classes to be passed to base component'
    }
  },
  controls: {}
};

const Template = (args) => <SidebarNavigationWCollapse {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

Primary.args = {
  sidebarPrimaryNavigation: primaryNavs,
  sidebarSecondaryNavigation: secondaryNavs
};

export default defaultConfig;
export { Primary };
