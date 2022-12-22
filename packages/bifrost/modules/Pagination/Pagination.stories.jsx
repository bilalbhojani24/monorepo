import React from 'react';
import Pagination from './index';
import DocPageTemplate from '../../.storybook/DocPageTemplate';

const defaultConfig = {
  title: 'Application/Components/Pagination',
  component: Pagination,
  parameters: {
    docs: {
      page: () => {
        return <DocPageTemplate importStatement={"import Pagination from 'bifrost/Pagination'"} />;
      }
    }
  },
  argTypes: {
    count: {
      option: { type: 'number' },
      defaultValue: 100,
      description: 'Total number of results in pagination'
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
      defaultValue: 1,
      description: 'Current page number, default is 1'
    },
    pageSize: {
      option: { type: 'number' },
      defaultValue: 25,
      description: 'Total number of items per page, default is 25'
    },
    withNumber: {
      option: { type: 'boolean' },
      defaultValue: true,
      description: 'The pagination with numbers or with next/previous buttons only'
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
