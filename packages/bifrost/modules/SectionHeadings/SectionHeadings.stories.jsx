import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import Button from '../Button';

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
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/GCu9Z0GTnebRUa5nioN6Yr/Tailwind-UI-Library?node-id=181-38680&t=TWCLo3KWhysdxj9F-0'
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
        <div className="flex items-center">
          <Button aria-label="Increment value" wrapperClassName="mr-3">
            Really long
          </Button>
          <Button aria-label="Increment value" wrapperClassName="ml-3 mr-3">
            Button name
          </Button>
        </div>
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
