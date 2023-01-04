import React from 'react';
import SidebarNavigation from './index';
import DocPageTemplate from '../../.storybook/DocPageTemplate';
import { navs } from './const/sidebarNavigationConstants';

const defaultConfig = {
  title: 'Application/Components/SidebarNavigation',
  component: SidebarNavigation,
  parameters: {
    docs: {
      page: () => {
        return <DocPageTemplate importStatement={"import SidebarNavigation from 'bifrost/SidebarNavigation'"} />;
      }
    }
  },
  argTypes: {
    activeClass: {
      options: { type: 'string' },
      defaultValue: ''
    },
    activeIconClass: {
      options: { type: 'string' },
      defaultValue: ''
    },
    brandImage: {
      options: { type: 'string' },
      defaultValue: 'https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
    },
    brandImageContainerClass: {
      options: { type: 'string' },
      defaultValue: ''
    },
    brandImageClass: {
      options: { type: 'string' },
      defaultValue: ''
    },
    handleClick: {
      options: { type: null },
      defaultValue: (currentItem, parentItem) => {
        console.log(currentItem);
        console.log(parentItem);
      }
    },
    inActiveClass: {
      options: { type: 'string' },
      defaultValue: ''
    },
    inActiveIconClass: {
      options: { type: 'string' },
      defaultValue: ''
    },
    navItems: {
      options: { type: null },
      defaultValue: navs
    },
    wrapperClass: {
      options: { type: 'string' },
      defaultValue: ''
    }
  },
  controls: {}
};
const Template = (args) => <SidebarNavigation {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };
