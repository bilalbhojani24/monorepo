import React from 'react';
import { delay } from '@browserstack/utils';
import { expect } from '@storybook/jest';
import { userEvent, within } from '@storybook/testing-library';

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
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/GCu9Z0GTnebRUa5nioN6Yr/Tailwind-UI-Library?node-id=210-40002&t=TWCLo3KWhysdxj9F-0'
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
const sidebarItems = ['Dashboard', 'Team', 'Projects', 'Calendar', 'John Doe'];

const Template = (args) => <SidebarNavigationWCollapse {...args} />;
const cutOffTemplate = (args) => <SidebarNavigationWCollapse {...args} />;

const Primary = Template.bind({});
Primary.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  sidebarItems.forEach(async (item) => {
    await expect(canvas.getByText(item)).toBeVisible();
  });
};

const cutOffVariant = cutOffTemplate.bind({});
cutOffVariant.play = async () => {
  await delay(1);
  const buttons = document.querySelectorAll('button');
  await userEvent.hover(buttons[3]);
  await userEvent.hover(buttons[4]);
  await userEvent.hover(buttons[5]);
  await userEvent.hover(buttons[6]);
};
cutOffVariant.parameters = {
  controls: {}
};

Primary.parameters = {
  controls: {}
};

Primary.args = {
  sidebarPrimaryNavigation: primaryNavs,
  sidebarSecondaryNavigation: secondaryNavs
};

cutOffVariant.args = {
  sidebarPrimaryNavigation: primaryNavs,
  sidebarSecondaryNavigation: secondaryNavs,
  collapsedCutoff: 9000
};

export default defaultConfig;
export { cutOffVariant, Primary };
