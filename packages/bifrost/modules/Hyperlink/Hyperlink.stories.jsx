import React from 'react';
import Hyperlink from './index';
import DocPageTemplate from '../../.storybook/DocPageTemplate';
import { EnvelopeIcon } from '../Icon';

const defaultConfig = {
  title: 'Application/Components/Hyperlink',
  component: Hyperlink,
  parameters: {
    docs: {
      page: () => {
        return <DocPageTemplate importStatement={"import Hyperlink from 'bifrost/Hyperlink'"} />;
      }
    }
  },
  argTypes: {
    color: {
      control: { type: 'text' },
      type: { summary: 'TEXT', required: false },
      description: 'Lorem Ipsum',
      defaultValue: 'text-pink-600'
    },
    disabled: {
      control: { type: 'boolean' },
      type: { summary: 'BOOLEAN', required: false },
      description: 'Lorem Ipsum'
    },
    fontSize: {
      control: { type: 'text' },
      type: { summary: 'TEXT', required: false },
      description: 'Lorem Ipsum',
      defaultValue: 'text-base'
    },
    fontWeight: {
      control: { type: 'text' },
      type: { summary: 'TEXT', required: false },
      description: 'Lorem Ipsum',
      defaultValue: 'font-bold'
    },
    href: {
      control: { type: 'text' },
      type: { summary: 'TEXT', required: false },
      description: 'Lorem Ipsum'
    },
    underlined: {
      control: { type: 'boolean' },
      type: { summary: 'BOOLEAN', required: false },
      description: 'Lorem Ipsum'
    },
    wrapperClassName: {
      control: { type: 'text' },
      type: { summary: 'TEXT', required: false },
      description: 'Lorem Ipsum'
    }
  },
  controls: {}
};
const Template = (args) => <Hyperlink {...args}>View</Hyperlink>;

const LeadingIconTemplate = (args) => (
  <Hyperlink {...args}>
    <EnvelopeIcon className="h-4 w-4 mr-1" />
    View
  </Hyperlink>
);

const TrailingIconTemplate = (args) => (
  <Hyperlink {...args}>
    View
    <EnvelopeIcon className="h-4 w-4 ml-1" />
  </Hyperlink>
);

const Primary = Template.bind({});
const LeadingIcon = LeadingIconTemplate.bind({});
const TrailingIcon = TrailingIconTemplate.bind({});

Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary, LeadingIcon, TrailingIcon };
