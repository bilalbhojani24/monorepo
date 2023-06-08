import React from 'react';
import { expect } from '@storybook/jest';
import { userEvent, within } from '@storybook/testing-library';

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

const jobPostings = 'Job Postings';
const button1Text = 'Really long';
const button2Text = 'Button name';
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
      defaultValue: jobPostings
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
    headerWrapperClassName: {
      type: { summary: 'STRING', required: false },
      description: 'Header component wrapper class name',
      control: { type: 'text' },
      defaultValue: ''
    },
    trailingHeadNode: {
      type: { summary: 'NODE', required: false },
      description: 'ABCDEFGHIJK',
      defaultValue: (
        <div className="flex items-center">
          <Button wrapperClassName="mr-3">{button1Text}</Button>
          <Button wrapperClassName="ml-3 mr-3">{button2Text}</Button>
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
Primary.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await expect(canvas.getByText(jobPostings)).toBeVisible();
  await userEvent.click(canvas.getByText(button1Text));
  await userEvent.click(canvas.getByText(button2Text));
  tabs.forEach(async (tab) => {
    await expect(canvas.getByText(tab.name)).toBeVisible();
    await userEvent.click(canvas.getByText(tab.name));
  });
};

const WithHeaderClassName = Template.bind({});
WithHeaderClassName.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await expect(canvas.getByText(jobPostings)).toBeVisible();
  await userEvent.click(canvas.getByText(button1Text));
  await userEvent.click(canvas.getByText(button2Text));
  tabs.forEach(async (tab) => {
    await expect(canvas.getByText(tab.name)).toBeVisible();
    await userEvent.click(canvas.getByText(tab.name));
  });
};
WithHeaderClassName.args = {
  headerWrapperClassName:
    'flex flex-wrap items-center justify-between sm:flex-nowrap mb-4 sm:mb-0'
};

Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary, WithHeaderClassName };
