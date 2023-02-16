import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';

import Header from './index';

const defaultConfig = {
  title: 'Application/Components/Header',
  component: Header,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={"import Header from 'bifrost/Header'"}
        />
      )
    }
  },
  argTypes: {
    wrapperClassName: {
      option: { type: 'string' },
      defaultValue: ''
    },
    productName: {
      control: { type: 'text' },
      type: { summary: 'TEXT', required: true },
      defaultValue: 'Live'
    },
    productLink: {
      control: { type: 'text' },
      type: { summary: 'TEXT', required: true },
      defaultValue: ''
    },
    release: {
      control: { type: 'text' },
      type: { summary: 'TEXT', required: false },
      defaultValue: 'alpha'
    },
    documentationLink: {
      control: { type: 'text' },
      type: { summary: 'TEXT', required: true },
      defaultValue: ''
    },
    supportLink: {
      control: { type: 'text' },
      type: { summary: 'TEXT', required: true },
      defaultValue: ''
    },
    beamerProductId: {
      control: { type: 'text' },
      type: { summary: 'TEXT', required: true },
      defaultValue: 'XxcUulZf52793'
    },
    showTestInsights: {
      control: { type: 'boolean' },
      type: { summary: 'BOOLEAN', required: true },
      defaultValue: true
    },
    headerElementArray: {
      defaultValue: [
        'team',
        'pricing',
        'help',
        'search',
        'notifications',
        'account'
      ]
    },
    documentation: {
      defaultValue: { title: '', options: [] }
    },
    references: {
      defaultValue: { title: '', options: [] }
    },
    others: {
      defaultValue: { title: '', options: [] }
    }
  },
  controls: {}
};
const Template = (args) => <Header {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };
