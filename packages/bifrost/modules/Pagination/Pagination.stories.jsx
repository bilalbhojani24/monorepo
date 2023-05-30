import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';

import Pagination from './index';

const defaultConfig = {
  title: 'Application/Components/Pagination',
  component: Pagination,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={"import Pagination from 'bifrost/Pagination'"}
        />
      )
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/GCu9Z0GTnebRUa5nioN6Yr/Tailwind-UI-Library?node-id=371-7919&t=TWCLo3KWhysdxj9F-0'
    }
  },
  argTypes: {
    count: {
      option: { type: 'number' },
      defaultValue: 100,
      description: 'Total number of results in pagination'
    },
    defaultPageNumber: {
      option: { type: 'number' },
      defaultValue: 2,
      description:
        'Current page number, default is undefined and it is uncontrolled'
    },
    isCentered: {
      option: { type: 'boolean' },
      defaultValue: false,
      description: 'Pagination number in the center'
    },
    onNextClick: {
      option: { type: null },
      defaultValue: (pageNumber) => {
        console.log(pageNumber);
      },
      description: 'Callback when next page button clicked'
    },
    onPageNumberClick: {
      option: { type: null },
      defaultValue: (pageNumber) => {
        console.log(pageNumber);
      },
      description: 'Callback when page number button clicked'
    },
    onPreviousClick: {
      option: { type: null },
      defaultValue: (pageNumber) => {
        console.log(pageNumber);
      },
      description: 'Callback when previous page button clicked'
    },
    pageNumber: {
      option: { type: 'number' },
      defaultValue: undefined,
      description:
        'Current page number, default is undefined and it is controlled from consumer'
    },
    pageSize: {
      option: { type: 'number' },
      defaultValue: 25,
      description: 'Total number of items per page, default is 25'
    },
    withNumber: {
      option: { type: 'boolean' },
      defaultValue: true,
      description:
        'The pagination with numbers or with next/previous buttons only'
    },
    hideDetailsString: {
      control: { type: 'boolean' },
      description: 'Hide string with pagination details',
      type: { summary: 'BOOLEAN', required: false },
      defaultValue: false
    },
    wrapperClassName: {
      control: { type: 'text' },
      type: { summary: 'TEXT', required: false },
      description:
        'Additional styles to be passed to the root of the component',
      defaultValue: ''
    }
  },
  controls: {}
};
const Template = (args) => <Pagination {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };
