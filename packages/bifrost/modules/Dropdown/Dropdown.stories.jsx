import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import { ChevronDownIcon } from '../Icon';

import Dropdown from './index';

const defaultConfig = {
  title: 'Application/Components/Dropdown',
  component: Dropdown,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={"import Dropdown from 'bifrost/Dropdown'"}
        />
      )
    }
  },
  argTypes: {
    trigger: {
      description: 'Trigger to open/close dropdown',
      defaultValue: (
        <div className="border-base-300 text-base-700 hover:bg-base-50 focus:ring-brand-500 focus:ring-offset-base-100 inline-flex w-full justify-center rounded-md border bg-white px-4 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2">
          Options
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </div>
      )
    },
    headerVisible: {
      control: { type: 'boolean' },
      type: { summary: 'BOOLEAN', required: false },
      description: 'Lorem amit',
      defaultValue: false
    },
    heading: {
      control: { type: 'text' },
      type: { summary: 'TEXT', required: false },
      description: 'Lorem Ipsum',
      defaultValue: 'Lorem'
    },
    subHeading: {
      control: { type: 'text' },
      type: { summary: 'TEXT', required: false },
      description: 'Lorem Ipsum',
      defaultValue: 'Ipsum'
    },
    options: {
      defaultValue: [
        {
          id: '1',
          body: 'Edit'
        },
        {
          id: '2',
          body: 'Duplicate',
          divider: false
        },
        {
          id: '3',
          body: 'Archive',
          divider: true
        }
      ]
    },
    wrapperClassName: {
      control: { type: 'text' },
      type: { summary: 'TEXT', required: false },
      description: 'wrapper styles for the dropdown component',
      defaultValue: ''
    }
  },
  controls: {}
};
const Template = (args) => (
  <div className="flex justify-center">
    <Dropdown {...args} />
  </div>
);
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };
