import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import { ChevronRightIcon } from '../Icon';

import { BREADCRUMB_SIZE, breadcrumbData } from './const/breadcrumbConstants';
import Breadcrumb from './index';

const defaultConfig = {
  title: 'Application/Components/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={"import Breadcrumb from 'bifrost/Breadcrumb'"}
        />
      )
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
    wrapperClassName: {
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
