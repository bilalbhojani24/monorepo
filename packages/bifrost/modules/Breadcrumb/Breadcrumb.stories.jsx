import React from 'react';
import Breadcrumb from './index';
import DocPageTemplate from '../../.storybook/DocPageTemplate';
import { breadcrumbData, BREADCRUMB_SIZE } from './const/breadcrumbConstants';
import { ChevronRightIcon } from '../Icon';

const defaultConfig = {
  title: 'Application/Components/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    docs: {
      page: () => {
        return <DocPageTemplate importStatement={"import Breadcrumb from 'bifrost/Breadcrumb'"} />;
      }
    }
  },
  argTypes: {
    ChevronIcon: {
      control: { type: 'inline-radio' },
      defaultValue: ChevronRightIcon
    },
    ChevronIconClass: {
      options: { type: 'string' },
      defaultValue: ''
    },
    data: {
      options: { type: null },
      defaultValue: breadcrumbData
    },
    onClick: {
      control: { type: null },
      defaultValue: (event, breadcrumbItem) => {
        console.log(event);
        console.log(breadcrumbItem);
      }
    },
    size: {
      options: BREADCRUMB_SIZE,
      control: { type: 'inline-radio' },
      defaultValue: BREADCRUMB_SIZE.default
    },
    wrapperClass: {
      options: { type: 'string' },
      defaultValue: ''
    }
  },
  controls: {}
};
const Template = (args) => <Breadcrumb {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };
