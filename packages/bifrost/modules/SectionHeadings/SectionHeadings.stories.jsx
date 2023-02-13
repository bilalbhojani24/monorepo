import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';

import SectionHeadings from './index';

const tabs = [
  { name: 'Applied' },
  { name: 'Phone Screening' },
  { name: 'Interview' },
  { name: 'Offer' },
  { name: 'Hired' }
];

const defaultConfig = {
  title: 'Application/Components/SectionHeadings',
  component: SectionHeadings,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={
            "import SectionHeadings from 'bifrost/SectionHeadings'"
          }
        />
      )
    }
  },
  argTypes: {
    title: {
      type: { summary: 'STRING', required: false },
      description: 'ABCDEFGHIJK',
      control: { type: 'text' },
      defaultValue: 'Job Postings'
    },
    subTitle: {
      type: { summary: 'STRING', required: false },
      description: 'ABCDEFGHIJK',
      control: { type: 'text' },
      defaultValue: 'in Engineering'
    },
    description: {
      type: { summary: 'STRING', required: false },
      description: 'ABCDEFGHIJK',
      control: { type: 'text' },
      defaultValue: ''
    },
    tabsWrapperClassName: {
      type: { summary: 'STRING', required: false },
      description: 'Tabs component wrapper class name',
      control: { type: 'text' },
      defaultValue: ''
    },
    trailingHeadNode: {
      type: { summary: 'NODE', required: false },
      description: 'ABCDEFGHIJK',
      defaultValue: (
        <p className="flex w-full justify-end">Trailing Head Node</p>
      )
    },
    tabsProps: {
      type: { summary: 'OBJECT', required: false },
      description: 'Object of props belonging to the Tabs component',
      control: { type: 'object' },
      defaultValue: { tabsArray: tabs }
    }
  },
  controls: {}
};
const Template = (args) => <SectionHeadings {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };
