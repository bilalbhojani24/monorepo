import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import { HomeIcon } from '../Icon';

import { SIDEBAR_MODIFIER } from './const/sidebarItemConstants';
import SidebarItem from './index';

const defaultConfig = {
  title: 'Application/Components/SidebarItem',
  component: SidebarItem,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={
            "import { SidebarItem } from '@browserstack/bifrost'"
          }
        />
      ),
    },
  },

  argTypes: {
    current: {
      option: { type: 'boolean' },
      defaultValue: false,
    },
    handleNavigationClick: {
      option: { type: null },
      defaultValue: (curr, par) => {},
    },
    modifier: {
      options: SIDEBAR_MODIFIER,
      control: { type: 'inline-radio' },
      defaultValue: SIDEBAR_MODIFIER[0],
    },
    nav: {
      option: { type: null },
      defaultValue: {
        id: 'dashboard',
        label: 'Dashboard',
        activeIcon: HomeIcon,
        inActiveIcon: HomeIcon,
        path: '/',
        badgeLabel: 'Active',
      },
    },
  },
  controls: {},
};
const Template = (args) => <SidebarItem {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {},
};

export default defaultConfig;
export { Primary };
